import { talents } from "../data/talents"
import { TalentNode } from "../headers/talent"
import { encodeTalentData } from "./encoding";
import { heroMapping } from "../data/heroes/heroMapping";
import { MAXPOINTS } from "./hero"


/*
 * Check whether a talent can currently be increased.
 */
export function canIncrease(
    layout: TalentNode[],
    selectedTalentNodes: Record<number, number>,
    talentNode: TalentNode
): boolean {

    const currentTalentNode = talentNode

    /*
     * ALL requirements must be completely filled.
     */
    const andConnection =
        currentTalentNode.requires?.length
            ? currentTalentNode.requires.every(requiredTalentNodeId => {

                const requiredTalentNode = layout.find(
                    talentNode => talentNode.id === requiredTalentNodeId
                )

                if (!requiredTalentNode)
                    return false

                const talent =
                    talents[requiredTalentNode.talentId]

                return (
                    (selectedTalentNodes[requiredTalentNode.id] || 0) ===
                    (talent.maxPoints || 1)
                )
            })
            : true


    /*
     * At least ONE "requiresAny" requirement must be
     * completely filled.
     *
     * An empty requiresAny array means there is no
     * OR requirement.
     */
    const orConnection =
        currentTalentNode.requiresAny?.length
            ? currentTalentNode.requiresAny.some(requiredTalentNodeId => {

                const requiredTalentNode = layout.find(
                    talentNode => talentNode.id === requiredTalentNodeId
                )

                if (!requiredTalentNode)
                    return false

                const talent =
                    talents[requiredTalentNode.talentId]

                return (
                    (selectedTalentNodes[requiredTalentNode.id] || 0) ===
                    (talent.maxPoints || 1)
                )
            })
            : true


    return andConnection && orConnection
}


/*
 * Check whether a talent can be decreased.
 */
export function canDecrease(
    layout: TalentNode[],
    selectedTalentNodes: Record<number, number>,
    talentNode: TalentNode
): boolean {

    const currentTalentNode = talentNode

    return layout.every(talentNode => {

        const isActive =
            (selectedTalentNodes[talentNode.id] || 0) > 0

        if (!isActive)
            return true


        /*
         * A talent cannot be decreased if another
         * active talent directly requires it.
         */
        if (
            talentNode.requires?.includes(
                currentTalentNode.id
            )
        ) {
            return false
        }


        /*
         * For OR requirements, the current talent can
         * only be decreased if another valid alternative
         * is already completely filled.
         */
        if (
            talentNode.requiresAny?.includes(
                currentTalentNode.id
            )
        ) {

            return talentNode.requiresAny.some(
                requiredTalentNodeId => {

                    if (
                        requiredTalentNodeId ===
                        currentTalentNode.id
                    ) {
                        return false
                    }

                    const requiredNode =
                        layout.find(
                            n =>
                                n.id ===
                                requiredTalentNodeId
                        )

                    if (!requiredNode)
                        return false

                    const talent =
                        talents[requiredNode.talentId]

                    return (
                        (selectedTalentNodes[
                            requiredNode.id
                        ] || 0) ===
                        (talent.maxPoints || 1)
                    )
                }
            )
        }

        return true
    })
}


/*
 * ---------------------------------------------------------------------------
 * AUTO-FILL
 * ---------------------------------------------------------------------------
 *
 * Finds a valid path of missing prerequisites for a talent.
 *
 * The function returns the talent node IDs that need to be activated.
 *
 * Existing activated talents are never added again.
 */
function getRequiredTalentPath(
    talentNode: TalentNode,
    layout: TalentNode[],
    selectedTalentNodes: Record<number, number>,
    visited = new Set<number>()
): number[] {

    /*
     * Prevent circular dependency problems.
     */
    if (visited.has(talentNode.id)) {
        return []
    }

    visited.add(talentNode.id)

    const result: number[] = []


    /*
     * Handle ALL requirements.
     *
     * Every one of these must be completed.
     */
    for (
        const requiredTalentNodeId
        of talentNode.requires ?? []
    ) {

        const requiredTalentNode =
            layout.find(
                node =>
                    node.id ===
                    requiredTalentNodeId
            )

        if (!requiredTalentNode)
            continue

        const requiredTalent =
            talents[
                requiredTalentNode.talentId
            ]

        const requiredMaxPoints =
            requiredTalent.maxPoints || 1

        const currentPoints =
            selectedTalentNodes[
                requiredTalentNode.id
            ] || 0


        /*
         * Already completely filled:
         * nothing to do.
         */
        if (
            currentPoints >=
            requiredMaxPoints
        ) {
            continue
        }


        /*
         * First resolve this prerequisite's
         * own prerequisites.
         */
        result.push(
            ...getRequiredTalentPath(
                requiredTalentNode,
                layout,
                selectedTalentNodes,
                new Set(visited)
            )
        )


        /*
         * Fill the prerequisite completely.
         *
         * We add its ID once for every required point.
         */
        for (
            let point = currentPoints;
            point < requiredMaxPoints;
            point++
        ) {
            result.push(
                requiredTalentNode.id
            )
        }
    }


    /*
 * Handle OR requirements.
 *
 * If no OR branch is already satisfied,
 * prefer the branch that the user has already
 * started progressing.
 */
if (
    talentNode.requiresAny &&
    talentNode.requiresAny.length > 0
) {

    const candidates = talentNode.requiresAny
        .map((requiredTalentNodeId, index) => {

            const requiredTalentNode =
                layout.find(
                    node =>
                        node.id ===
                        requiredTalentNodeId
                );

            if (!requiredTalentNode) {
                return null;
            }

            const requiredTalent =
                talents[
                    requiredTalentNode.talentId
                ];

            const requiredMaxPoints =
                requiredTalent.maxPoints || 1;

            const currentPoints =
                selectedTalentNodes[
                    requiredTalentNode.id
                ] || 0;

            /*
             * This branch is already completely
             * satisfied.
             */
            const isComplete =
                currentPoints >=
                requiredMaxPoints;

            /*
             * Progress of the branch.
             *
             * 0/3 = 0
             * 1/3 = 0.33
             * 2/3 = 0.66
             * 3/3 = 1
             */
            const progress =
                currentPoints /
                requiredMaxPoints;

            /*
             * Build the prerequisite path for
             * this branch.
             */
            const branchPath =
                getRequiredTalentPath(
                    requiredTalentNode,
                    layout,
                    selectedTalentNodes,
                    new Set(visited)
                );

            /*
             * Prevent circular dependencies.
             */
            const hasCycle =
                branchPath.some(
                    id =>
                        id ===
                        talentNode.id
                );

            if (hasCycle) {
                return null;
            }

            return {
                node: requiredTalentNode,
                currentPoints,
                requiredMaxPoints,
                progress,
                branchPath,
                index,
                isComplete,
            };
        })
        .filter(
            (
                candidate
            ): candidate is NonNullable<typeof candidate> =>
                candidate !== null
        );


    /*
     * If one of the OR branches is already
     * completely filled, the requirement is
     * already satisfied.
     */
    const alreadySatisfied =
        candidates.some(
            candidate =>
                candidate.isComplete
        );

    if (!alreadySatisfied) {

        /*
         * Sort branches by user progress.
         *
         * The branch the user has already started
         * receives priority.
         *
         * Existing data order is used as the
         * final tie-breaker.
         */
        candidates.sort(
            (a, b) => {

                if (
                    b.progress !==
                    a.progress
                ) {
                    return (
                        b.progress -
                        a.progress
                    );
                }

                return (
                    a.index -
                    b.index
                );
            }
        );


        const selectedBranch =
            candidates[0];


        if (selectedBranch) {

            result.push(
                ...selectedBranch.branchPath
            );


            /*
             * Complete the selected branch.
             *
             * Example:
             *
             * current = 1
             * max = 3
             *
             * -> add 2 points
             */
            for (
                let point =
                    selectedBranch.currentPoints;
                point <
                selectedBranch.requiredMaxPoints;
                point++
            ) {

                result.push(
                    selectedBranch
                        .node.id
                );
            }
        }
    }
}


    return result
}


/*
 * Create the complete state required to activate
 * a talent, including missing prerequisites.
 */
function buildAutoFilledState(
    talentNode: TalentNode,
    selectedTalentNodes: Record<number, number>,
    layout: TalentNode[]
): Record<number, number> {

    const nextState = {
        ...selectedTalentNodes,
    }


    /*
     * Find all missing prerequisites.
     */
    const requiredPath =
        getRequiredTalentPath(
            talentNode,
            layout,
            selectedTalentNodes
        )


    /*
     * Activate the required talents.
     */
    for (
        const requiredTalentNodeId
        of requiredPath
    ) {

        const currentPoints =
            nextState[
                requiredTalentNodeId
            ] || 0

        const requiredNode =
            layout.find(
                node =>
                    node.id ===
                    requiredTalentNodeId
            )

        if (!requiredNode)
            continue

        const maxPoints =
            talents[
                requiredNode.talentId
            ].maxPoints || 1

        if (
            currentPoints <
            maxPoints
        ) {
            nextState[
                requiredTalentNodeId
            ] =
                currentPoints + 1
        }
    }


    /*
     * Finally activate the requested talent
     * by one point.
     */
    const currentPoints =
        nextState[talentNode.id] || 0

    const maxPoints =
        talents[
            talentNode.talentId
        ].maxPoints || 1

    if (
        currentPoints <
        maxPoints
    ) {
        nextState[talentNode.id] =
            currentPoints + 1
    }


    /*
     * Remove zero-value entries.
     */
    for (
        const [id, points]
        of Object.entries(nextState)
    ) {
        if (points <= 0) {
            delete nextState[
                Number(id)
            ]
        }
    }


    return nextState
}


/*
 * ---------------------------------------------------------------------------
 * LEFT CLICK
 * ---------------------------------------------------------------------------
 */
export function handleLeftClick(
    talentNode: TalentNode,
    selectedTalentNodes: Record<number, number>,
    setSelectedTalentNodes: React.Dispatch<
        React.SetStateAction<Record<number, number>>
    >,
    layout: TalentNode[],
    talentPoints: number
) {

    const currentPoints =
        selectedTalentNodes[
            talentNode.id
        ] || 0

    const maxPoints =
        talents[
            talentNode.talentId
        ].maxPoints || 1


    /*
     * Already maxed.
     */
    if (
        currentPoints >=
        maxPoints
    ) {
        return
    }


    /*
     * Global point limit.
     *
     * We allow the click only if the requested
     * talent itself can be added.
     *
     * Auto-fill is checked below as well.
     */
    if (
        talentPoints >=
        MAXPOINTS
    ) {
        return
    }


    /*
     * If the talent is already directly available,
     * simply increase it by one.
     *
     * This keeps normal clicking extremely cheap.
     */
    if (
        canIncrease(
            layout,
            selectedTalentNodes,
            talentNode
        )
    ) {

        setSelectedTalentNodes({
            ...selectedTalentNodes,
            [talentNode.id]:
                currentPoints + 1,
        })

        return
    }


    /*
     * Otherwise automatically build the missing
     * prerequisite path.
     */
    const nextState =
        buildAutoFilledState(
            talentNode,
            selectedTalentNodes,
            layout
        )


    /*
     * Calculate how many additional points the
     * operation would consume.
     */
    const previousPoints =
        Object.values(
            selectedTalentNodes
        ).reduce(
            (sum, value) =>
                sum + value,
            0
        )

    const nextPoints =
        Object.values(
            nextState
        ).reduce(
            (sum, value) =>
                sum + value,
            0
        )

    const addedPoints =
        nextPoints -
        previousPoints


    /*
     * Never exceed MAXPOINTS.
     */
    if (
        talentPoints +
        addedPoints >
        MAXPOINTS
    ) {
        return
    }


    /*
     * One state update = one Undo step.
     *
     * This is important for the history system:
     * clicking a distant talent and auto-filling
     * several prerequisites can be undone with
     * one press of Undo.
     */
    setSelectedTalentNodes(
        nextState
    )
}


/*
 * ---------------------------------------------------------------------------
 * RIGHT CLICK
 * ---------------------------------------------------------------------------
 */
export function handleRightClick(
    e: React.MouseEvent,
    talentNode: TalentNode,
    selectedTalentNodes: Record<number, number>,
    setSelectedTalentNodes: React.Dispatch<
        React.SetStateAction<Record<number, number>>
    >,
    layout: TalentNode[]
) {

    e.preventDefault()

    const currentPoints =
        selectedTalentNodes[
            talentNode.id
        ] || 0


    if (
        currentPoints <= 0 ||
        !canDecrease(
            layout,
            selectedTalentNodes,
            talentNode
        )
    ) {
        return
    }


    const nextState = {
        ...selectedTalentNodes,
        [talentNode.id]:
            currentPoints - 1,
    }


    /*
     * Remove empty entries from the state.
     */
    if (
        nextState[talentNode.id] <= 0
    ) {
        delete nextState[
            talentNode.id
        ]
    }


    setSelectedTalentNodes(
        nextState
    )
}


/*
 * ---------------------------------------------------------------------------
 * EDIT MODE / SHARING
 * ---------------------------------------------------------------------------
 */
export const editMode = (
    heroKey: string,
    selectedTalentNodes: Record<number, number>
) => {

    const hero =
        heroMapping[heroKey]

    if (!hero) {
        console.error(
            `editMode: Hero "${heroKey}" does not exist.`
        )

        return
    }

    const encoded =
        encodeTalentData(
            selectedTalentNodes,
            hero.layout
        )

    const url =
        `${window.location.origin}/arcguides/talents/${heroKey}${
            encoded
                ? `?data=${encoded}`
                : ""
        }`

    window.location.href =
        url
}