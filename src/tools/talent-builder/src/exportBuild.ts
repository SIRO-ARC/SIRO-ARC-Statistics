import { talents } from "../data/talents";
import { getCoordinates } from "../headers/position";
import { TalentNode } from "../headers/talent";
import {
    CalculatedStat,
    getStatCategoryLabel,
} from "./stats";

const EXPORT_WIDTH = 1920;
const EXPORT_HEIGHT = 1080;

const NODE_SIZE = 40;
const NODE_RADIUS = 20;

/*
 * Export layout
 */
const HEADER_X = 70;
const HEADER_Y = 55;
const HEADER_WIDTH = EXPORT_WIDTH - 140;
const HEADER_HEIGHT = 118;

const TREE_AREA_X = 55;
const TREE_AREA_Y = 190;
const TREE_AREA_WIDTH = EXPORT_WIDTH - 110;
const TREE_AREA_HEIGHT = 525;

const STATS_X = 70;
const STATS_Y = 700;
const STATS_WIDTH = EXPORT_WIDTH - 140;
const STATS_HEIGHT = 285;

const TREE_VERTICAL_SCALE = 1.22;

type HeroExportData = {
    title: string;
    iconImage: string;
    layout: TalentNode[];
};

type ExportBuildOptions = {
    hero: HeroExportData;
    selectedTalentNodes: Record<number, number>;
    talentPoints: number;
    maxPoints: number;
    stats: CalculatedStat[];
};


/*
 * ---------------------------------------------------------------------------
 * HELPERS
 * ---------------------------------------------------------------------------
 */

function loadImage(
    src: string
): Promise<HTMLImageElement> {

    return new Promise((resolve, reject) => {

        const image = new Image();

        image.onload = () => resolve(image);

        image.onerror = () =>
            reject(
                new Error(
                    `Could not load image: ${src}`
                )
            );

        image.src = src;
    });
}


function roundRect(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    width: number,
    height: number,
    radius: number
) {

    const r = Math.min(
        radius,
        width / 2,
        height / 2
    );

    ctx.beginPath();

    ctx.moveTo(
        x + r,
        y
    );

    ctx.arcTo(
        x + width,
        y,
        x + width,
        y + height,
        r
    );

    ctx.arcTo(
        x + width,
        y + height,
        x,
        y + height,
        r
    );

    ctx.arcTo(
        x,
        y + height,
        x,
        y,
        r
    );

    ctx.arcTo(
        x,
        y,
        x + width,
        y,
        r
    );

    ctx.closePath();
}


function formatNumber(
    value: number
): string {

    if (Number.isInteger(value)) {
        return value.toString();
    }

    return value
        .toFixed(2)
        .replace(/\.?0+$/, "");
}


function getCategoryIcon(
    category?: string
): string {

    const icons: Record<string, string> = {
        OFFENSIVE: "⚔",
        DEFENSIVE: "🛡",
        UTILITY: "✦",
        CAPACITY: "👥",
        HEALING: "♥",
        SIEGE: "⚔",
        GARRISON: "◆",
        GATHERING: "⛏",
    };

    return icons[
        category || ""
    ] || "✦";
}


/*
 * ---------------------------------------------------------------------------
 * TREE BOUNDS
 * ---------------------------------------------------------------------------
 */

function getTreeBounds(
    layout: TalentNode[]
) {

    const positions = layout.map(
        node =>
            getCoordinates(
                node.pos
            )
    );

    const minX = Math.min(
        ...positions.map(
            position => position.x
        )
    );

    const maxX = Math.max(
        ...positions.map(
            position =>
                position.x +
                NODE_SIZE
        )
    );

    const minY = Math.min(
        ...positions.map(
            position => position.y
        )
    );

    const maxY = Math.max(
        ...positions.map(
            position =>
                position.y +
                60
        )
    );

    const paddingX = 55;
    const paddingY = 40;

    return {
        minX:
            minX -
            paddingX,

        minY:
            minY -
            paddingY,

        maxX:
            maxX +
            paddingX,

        maxY:
            maxY +
            paddingY,

        width:
            maxX -
            minX +
            paddingX * 2,

        height:
            maxY -
            minY +
            paddingY * 2,
    };
}


/*
 * ---------------------------------------------------------------------------
 * CONNECTIONS
 * ---------------------------------------------------------------------------
 */

function isConnectionActive(
    currentId: number,
    requiredId: number,
    selected: Record<number, number>,
    layout: TalentNode[],
    isAny: boolean
) {

    const current =
        layout.find(
            talent =>
                talent.id ===
                currentId
        );

    const required =
        layout.find(
            talent =>
                talent.id ===
                requiredId
        );

    if (
        !current ||
        !required
    ) {
        return false;
    }

    const requiredTalent =
        talents[
            required.talentId
        ];

    const requiredActivated =
        (selected[
            requiredId
        ] || 0) ===
        (
            requiredTalent?.maxPoints ||
            1
        );

    const currentActivated =
        (
            selected[
                currentId
            ] || 0
        ) >= 1;

    return isAny
        ? requiredActivated &&
          currentActivated
        : currentActivated &&
          requiredActivated;
}


function rowOffset(
    posRow: string,
    fromY: number,
    toY: number
) {

    if (
        fromY ===
        toY
    ) {
        return 0;
    }

    if (
        posRow ===
        "bottom"
    ) {
        return 3;
    }

    if (
        posRow ===
        "top"
    ) {
        return 5;
    }

    return 0;
}


function drawConnection(
    ctx: CanvasRenderingContext2D,
    current: TalentNode,
    required: TalentNode,
    selectedTalentNodes: Record<number, number>,
    layout: TalentNode[],
    isAny: boolean,
    offsetX: number,
    offsetY: number,
    scale: number
) {

    const {
        x: fromXRaw,
        y: fromYRaw,
    } = getCoordinates(
        required.pos
    );

    const {
        x: toXRaw,
        y: toYRaw,
    } = getCoordinates(
        current.pos
    );


    /*
     * IMPORTANT:
     *
     * X and Y are transformed through
     * the exact same tree coordinate system.
     *
     * Only the Y distance is increased
     * proportionally. No node or line is
     * independently distorted.
     */
    const fromX =
        (
            fromXRaw -
            offsetX
        ) * scale;

    const fromY =
        (
            fromYRaw -
            offsetY
        ) *
        scale *
        TREE_VERTICAL_SCALE;

    const toX =
        (
            toXRaw -
            offsetX
        ) * scale;

    const toY =
        (
            toYRaw -
            offsetY
        ) *
        scale *
        TREE_VERTICAL_SCALE;


    const dx =
        toX -
        fromX;

    const dy =
        toY -
        fromY;

    const distance =
        Math.sqrt(
            dx * dx +
            dy * dy
        );

    if (
        distance === 0
    ) {
        return;
    }

    const nx =
        dx /
        distance;

    const ny =
        dy /
        distance;


    const nodeRadius =
        NODE_RADIUS *
        scale;


    const offsetRequired =
        rowOffset(
            required.pos.row,
            fromYRaw,
            toYRaw
        ) *
        scale *
        TREE_VERTICAL_SCALE;

    const offsetCurrent =
        rowOffset(
            current.pos.row,
            fromYRaw,
            toYRaw
        ) *
        scale *
        TREE_VERTICAL_SCALE;


    const x1 =
        fromX +
        NODE_RADIUS * scale +
        nx * nodeRadius -
        offsetRequired *
            (
                required.pos.row ===
                "top"
                    ? -1
                    : 1
            );

    const y1 =
        fromY +
        NODE_RADIUS * scale +
        ny * nodeRadius +
        offsetRequired;


    const x2 =
        toX +
        NODE_RADIUS * scale -
        nx * nodeRadius +
        offsetCurrent *
            (
                current.pos.row ===
                "top"
                    ? -1
                    : 1
            );

    const y2 =
        toY +
        NODE_RADIUS * scale -
        ny * nodeRadius +
        offsetCurrent;


    const active =
        isConnectionActive(
            current.id,
            required.id,
            selectedTalentNodes,
            layout,
            isAny
        );


    if (active) {

        /*
         * Cyan glow
         */
        ctx.beginPath();

        ctx.moveTo(
            x1,
            y1
        );

        ctx.lineTo(
            x2,
            y2
        );

        ctx.strokeStyle =
            "rgba(56,189,248,0.22)";

        ctx.lineWidth =
            8 * scale;

        ctx.lineCap =
            "round";

        ctx.stroke();


        /*
         * Main cyan line
         */
        ctx.beginPath();

        ctx.moveTo(
            x1,
            y1
        );

        ctx.lineTo(
            x2,
            y2
        );

        ctx.strokeStyle =
            "rgba(56,189,248,0.9)";

        ctx.lineWidth =
            4 * scale;

        ctx.lineCap =
            "round";

        ctx.stroke();

    } else {

        /*
         * Inactive line
         */
        ctx.beginPath();

        ctx.moveTo(
            x1,
            y1
        );

        ctx.lineTo(
            x2,
            y2
        );

        ctx.strokeStyle =
            "rgba(71,85,105,0.65)";

        ctx.lineWidth =
            2 * scale;

        ctx.lineCap =
            "round";

        ctx.stroke();
    }
}


function drawConnections(
    ctx: CanvasRenderingContext2D,
    layout: TalentNode[],
    selectedTalentNodes: Record<number, number>,
    offsetX: number,
    offsetY: number,
    scale: number
) {

    /*
     * Normal requirements
     */
    for (
        const current
        of layout
    ) {

        const requirements =
            current.requires ??
            [];

        for (
            const requiredId
            of requirements
        ) {

            const required =
                layout.find(
                    node =>
                        node.id ===
                        requiredId
                );

            if (!required) {
                continue;
            }

            drawConnection(
                ctx,
                current,
                required,
                selectedTalentNodes,
                layout,
                false,
                offsetX,
                offsetY,
                scale
            );
        }
    }


    /*
     * Any-of requirements
     */
    for (
        const current
        of layout
    ) {

        const requirements =
            current.requiresAny ??
            [];

        for (
            const requiredId
            of requirements
        ) {

            const required =
                layout.find(
                    node =>
                        node.id ===
                        requiredId
                );

            if (!required) {
                continue;
            }

            drawConnection(
                ctx,
                current,
                required,
                selectedTalentNodes,
                layout,
                true,
                offsetX,
                offsetY,
                scale
            );
        }
    }
}


/*
 * ---------------------------------------------------------------------------
 * TALENT NODES
 * ---------------------------------------------------------------------------
 */

async function drawTalentNodes(
    ctx: CanvasRenderingContext2D,
    layout: TalentNode[],
    selectedTalentNodes: Record<number, number>,
    offsetX: number,
    offsetY: number,
    scale: number
) {

    const images =
        new Map<
            number,
            HTMLImageElement
        >();


    /*
     * Load talent icons first.
     */
    for (
        const talentNode
        of layout
    ) {

        const talent =
            talents[
                talentNode.talentId
            ];

        if (!talent) {
            continue;
        }

        const currentPoints =
            selectedTalentNodes[
                talentNode.id
            ] || 0;

        const isActive =
            currentPoints >
            0;

        const imageName =
            talent.image
                ? `${talent.image.replace(
                    ".png",
                    ""
                )}${
                    isActive
                        ? "_selected"
                        : ""
                }.png`
                : "placeholder.png";

        const imagePath =
            `/images/talent-builder/icons/${imageName}`;

        try {

            const image =
                await loadImage(
                    imagePath
                );

            images.set(
                talentNode.id,
                image
            );

        } catch {
            // Ignore missing icons.
        }
    }


    /*
     * Draw nodes.
     */
    for (
        const talentNode
        of layout
    ) {

        const talent =
            talents[
                talentNode.talentId
            ];

        if (!talent) {
            continue;
        }

        const {
            x: rawX,
            y: rawY,
        } = getCoordinates(
            talentNode.pos
        );


        const x =
            (
                rawX -
                offsetX
            ) * scale;

        const y =
            (
                rawY -
                offsetY
            ) *
            scale *
            TREE_VERTICAL_SCALE;


        const size =
            NODE_SIZE *
            scale;


        const currentPoints =
            selectedTalentNodes[
                talentNode.id
            ] || 0;

        const maxPoints =
            talent.maxPoints ||
            1;

        const isActive =
            currentPoints >
            0;

        const isEnhanced =
            talentNode.enhanced ??
            false;


        const backgroundColor =
            isActive
                ? isEnhanced
                    ? "rgba(120,83,15,0.85)"
                    : "rgba(8,47,73,0.95)"
                : "rgba(3,15,30,0.95)";


        const borderColor =
            isActive
                ? isEnhanced
                    ? "#facc15"
                    : "#38bdf8"
                : "rgba(56,189,248,0.28)";


        /*
         * Enhanced diamond
         */
        if (isEnhanced) {

            ctx.save();

            ctx.translate(
                x +
                    size / 2,
                y +
                    size / 2
            );

            ctx.rotate(
                Math.PI / 4
            );

            ctx.fillStyle =
                backgroundColor;

            ctx.strokeStyle =
                borderColor;

            ctx.lineWidth =
                2 * scale;

            roundRect(
                ctx,
                -(
                    36 *
                    scale
                ) / 2,
                -(
                    36 *
                    scale
                ) / 2,
                36 * scale,
                36 * scale,
                4 * scale
            );

            ctx.fill();

            ctx.stroke();

            ctx.restore();
        }


        /*
         * Node glow
         */
        ctx.save();

        ctx.shadowBlur =
            isActive
                ? 18 * scale
                : 8 * scale;

        ctx.shadowColor =
            isActive
                ? isEnhanced
                    ? "rgba(250,204,21,0.45)"
                    : "rgba(56,189,248,0.45)"
                : "rgba(56,189,248,0.08)";


        ctx.fillStyle =
            backgroundColor;

        ctx.strokeStyle =
            borderColor;

        ctx.lineWidth =
            2 * scale;


        roundRect(
            ctx,
            x,
            y,
            size,
            size,
            7 * scale
        );

        ctx.fill();

        ctx.stroke();

        ctx.restore();


        /*
         * Talent icon
         */
        const image =
            images.get(
                talentNode.id
            );

        if (image) {

            const iconSize =
                24 * scale;

            ctx.drawImage(
                image,
                x +
                    (
                        size -
                        iconSize
                    ) / 2,
                y +
                    (
                        size -
                        iconSize
                    ) / 2,
                iconSize,
                iconSize
            );
        }


        /*
         * Talent point counter.
         */
        const pointText =
            `${currentPoints}/${maxPoints}`;

        ctx.font =
            `600 ${
                12 * scale
            }px Arial`;

        ctx.textAlign =
            "center";

        ctx.textBaseline =
            "top";


        const pointY =
            y +
            size +
            5 * scale;


        const textWidth =
            ctx.measureText(
                pointText
            ).width;


        roundRect(
            ctx,
            x +
                size / 2 -
                textWidth / 2 -
                4 * scale,
            pointY -
                2 * scale,
            textWidth +
                8 * scale,
            17 * scale,
            4 * scale
        );

        ctx.fillStyle =
            isActive
                ? "rgba(14,116,144,0.22)"
                : "rgba(15,23,42,0.65)";

        ctx.fill();


        ctx.fillStyle =
            isActive
                ? "#7dd3fc"
                : "#94a3b8";

        ctx.fillText(
            pointText,
            x +
                size / 2,
            pointY
        );
    }
}


/*
 * ---------------------------------------------------------------------------
 * HERO HEADER
 * ---------------------------------------------------------------------------
 */

async function drawHeroHeader(
    ctx: CanvasRenderingContext2D,
    hero: HeroExportData,
    talentPoints: number,
    maxPoints: number
) {

    const x =
        HEADER_X;

    const y =
        HEADER_Y;

    const iconSize =
        92;


    /*
     * Full-width header.
     */
    roundRect(
        ctx,
        x,
        y,
        EXPORT_WIDTH - 140,
        HEADER_HEIGHT,
        22
    );

    ctx.fillStyle =
        "rgba(7,20,38,0.90)";

    ctx.fill();

    ctx.strokeStyle =
        "rgba(56,189,248,0.30)";

    ctx.lineWidth =
        1.5;

    ctx.stroke();


    /*
     * Hero icon container.
     */
    roundRect(
        ctx,
        x + 13,
        y + 13,
        iconSize,
        iconSize,
        18
    );

    ctx.fillStyle =
        "rgba(7,20,38,0.95)";

    ctx.fill();

    ctx.strokeStyle =
        "rgba(56,189,248,0.40)";

    ctx.lineWidth =
        1.5;

    ctx.stroke();


    try {

        const image =
            await loadImage(
                hero.iconImage
            );

        ctx.drawImage(
            image,
            x + 19,
            y + 19,
            iconSize - 12,
            iconSize - 12
        );

    } catch {
        // Ignore missing hero image.
    }


    /*
     * Hero name.
     */
    const heroName =
        hero.title.split(
            " - "
        )[0];

    ctx.textAlign =
        "left";

    ctx.textBaseline =
        "alphabetic";

    ctx.font =
        "700 30px Arial";

    ctx.fillStyle =
        "#38bdf8";

    ctx.shadowBlur =
        14;

    ctx.shadowColor =
        "rgba(56,189,248,0.40)";

    ctx.fillText(
        heroName,
        x + 125,
        y + 55
    );

    ctx.shadowBlur =
        0;


    /*
     * Talent points.
     */
    ctx.font =
        "600 18px Arial";

    ctx.fillStyle =
        "#ffffff";

    ctx.fillText(
        `${talentPoints} / ${maxPoints} TALENT POINTS`,
        x + 125,
        y + 86
    );


    /*
     * -----------------------------------------------------------------------
     * SIRO BRANDING
     * -----------------------------------------------------------------------
     */

    const brandingWidth = 235;

const brandingHeight =
    82;

const brandingRightMargin =
    25;

const brandingX =
    HEADER_X +
    HEADER_WIDTH -
    brandingRightMargin -
    brandingWidth;

    const brandingY =
        y + 18;


    roundRect(
        ctx,
        brandingX,
        brandingY,
        brandingWidth,
        brandingHeight,
        16
    );

    ctx.fillStyle =
        "rgba(8,47,73,0.22)";

    ctx.fill();

    ctx.strokeStyle =
        "rgba(56,189,248,0.25)";

    ctx.lineWidth =
        1;

    ctx.stroke();


    ctx.textAlign =
        "center";
        const brandingCenterX =
    brandingX +
    brandingWidth / 2;


    ctx.font =
        "700 18px Arial";

    ctx.fillStyle =
        "#38bdf8";

    ctx.fillText(
        "SIRO STATS",
        brandingCenterX,
        brandingY + 27
    );


    ctx.font =
        "500 12px Arial";

    ctx.fillStyle =
        "#cbd5e1";

    ctx.fillText(
    "Talent Tree Builder",
    brandingCenterX,
    brandingY + 48
);


    ctx.font =
        "600 12px Arial";

    ctx.fillStyle =
        "#7dd3fc";

    ctx.fillText(
    "siro-stats.com",
    brandingCenterX,
    brandingY + 67
);
}


/*
 * ---------------------------------------------------------------------------
 * STATS
 * ---------------------------------------------------------------------------
 */

function drawStats(
    ctx: CanvasRenderingContext2D,
    stats: CalculatedStat[]
) {



    /*
     * -----------------------------------------------------------------------
     * GROUP STATS BY CATEGORY
     * -----------------------------------------------------------------------
     */

    const grouped:
        Record<
            string,
            CalculatedStat[]
        > = {};

    for (
        const stat
        of stats
    ) {

        const category =
    (
        stat.category ||
        "Utility"
    ).toUpperCase();

if (!grouped[category]) {
    grouped[category] = [];
}

grouped[category].push(
    stat
);
    }


    /*
     * -----------------------------------------------------------------------
     * CATEGORY ORDER
     *
     * IMPORTANT:
     * Keep this order exactly as defined.
     * -----------------------------------------------------------------------
     */

    const categoryOrder = [
        "OFFENSIVE",
        "DEFENSIVE",
        "SIEGE",
        "GARRISON",
        "CAPACITY",
        "UTILITY",
        "HEALING",
        "GATHERING",
    ];

    const getStatsForCategory = (
    category: string
): CalculatedStat[] => {

    return grouped[
        category
    ] || [];
};

    /*
     * -----------------------------------------------------------------------
     * CATEGORY GRID
     * -----------------------------------------------------------------------
     */

    const columns = 4;

    const categories = [
        ...categoryOrder,
    ];

    const categoryRows: string[][] = [];


    for (
        let index = 0;
        index < categories.length;
        index += columns
    ) {

        categoryRows.push(
            categories.slice(
                index,
                index + columns
            )
        );
    }


    /*
     * -----------------------------------------------------------------------
     * DYNAMIC ROW HEIGHT
     * -----------------------------------------------------------------------
     *
     * The row height is determined by the category
     * containing the most stats.
     *
     * Empty categories still remain visible.
     * -----------------------------------------------------------------------
     */

    const rowHeights =
        categoryRows.map(
            rowCategories => {

                const maxStats =
                    Math.max(
                        ...rowCategories.map(
                            category =>
                                getStatsForCategory(
                                    category
                                ).length
                        )
                    );

                return Math.max(
                    100,
                    28 +
                    maxStats * 17 +
                    20
                );
            }
        );


    /*
     * -----------------------------------------------------------------------
     * PANEL HEIGHT
     * -----------------------------------------------------------------------
     */

    const headingHeight = 31;

    const panelPaddingBottom = 25;

    const panelHeight =
        headingHeight +
        rowHeights.reduce(
            (
                total,
                height
            ) =>
                total + height,
            0
        ) +
        panelPaddingBottom;


    /*
     * Keep the panel inside the
     * 1920 × 1080 export.
     */

    const MAX_STATS_BOTTOM = 1045;

    const maxAllowedHeight =
        MAX_STATS_BOTTOM -
        STATS_Y;

    const finalPanelHeight =
        Math.min(
            Math.max(
                285,
                panelHeight
            ),
            maxAllowedHeight
        );


    const panelX =
        STATS_X;

    const panelY =
        STATS_Y;

    const panelWidth =
        STATS_WIDTH;


    /*
     * -----------------------------------------------------------------------
     * PANEL BACKGROUND
     * -----------------------------------------------------------------------
     */

    roundRect(
        ctx,
        panelX,
        panelY,
        panelWidth,
        finalPanelHeight,
        20
    );

    ctx.fillStyle =
        "rgba(7,20,38,0.92)";

    ctx.fill();

    ctx.strokeStyle =
        "rgba(56,189,248,0.25)";

    ctx.lineWidth =
        1.5;

    ctx.stroke();


    /*
     * -----------------------------------------------------------------------
     * CATEGORY GRID
     * -----------------------------------------------------------------------
     */

    const columnWidth =
        panelWidth /
        columns;

    let currentRowY =
        panelY +
        headingHeight;


    categoryRows.forEach(
        (
            rowCategories,
            rowIndex
        ) => {

            const rowHeight =
                rowHeights[
                    rowIndex
                ];


            rowCategories.forEach(
                (
                    category,
                    columnIndex
                ) => {

                    const columnX =
                        panelX +
                        columnIndex *
                            columnWidth +
                        25;

                    const categoryY =
                        currentRowY;


                    const statsForCategory =
                        getStatsForCategory(
                            category
                        );


                    /*
                     * -------------------------------------------------------
                     * CATEGORY LABEL
                     * -------------------------------------------------------
                     */

                    ctx.textAlign =
                        "left";

                    ctx.textBaseline =
                        "alphabetic";

                    ctx.font =
                        "700 13px Arial";

                    ctx.fillStyle =
                        "#cbd5e1";


                    let label: string;


                    switch (category) {

                        case "OFFENSIVE":
                            label =
                                "ATTACK";
                            break;

                        case "DEFENSIVE":
                            label =
                                "DEFEND";
                            break;

                        case "UTILITY":
                            label =
                                "SPECIAL";
                            break;

                        default:
                            label =
                                getStatCategoryLabel(
                                    category
                                );
                            break;
                    }


                    const icon =
                        getCategoryIcon(
                            category
                        );


                    ctx.fillText(
                        `${icon} ${label}`,
                        columnX,
                        categoryY
                    );


                    /*
                     * -------------------------------------------------------
                     * CATEGORY SEPARATOR
                     * -------------------------------------------------------
                     */

                    ctx.strokeStyle =
                        "rgba(71,85,105,0.60)";

                    ctx.lineWidth =
                        1;

                    ctx.beginPath();

                    ctx.moveTo(
                        columnX,
                        categoryY + 9
                    );

                    ctx.lineTo(
                        columnX +
                            columnWidth -
                            45,
                        categoryY + 9
                    );

                    ctx.stroke();


                    /*
                     * -------------------------------------------------------
                     * STATS
                     *
                     * Empty categories intentionally
                     * contain no entries.
                     * -------------------------------------------------------
                     */

                    statsForCategory.forEach(
                        (
                            stat,
                            statIndex
                        ) => {

                            const statY =
                                categoryY +
                                28 +
                                statIndex *
                                    17;


                            /*
                             * Stat name
                             */

                            ctx.textAlign =
                                "left";

                            ctx.font =
                                "500 12px Arial";

                            ctx.fillStyle =
                                "#cbd5e1";

                            ctx.fillText(
                                stat.name,
                                columnX,
                                statY
                            );


                            /*
                             * Stat value
                             */

                            ctx.textAlign =
                                "right";

                            ctx.font =
                                "700 12px Arial";

                            ctx.fillStyle =
                                "#7dd3fc";

                            ctx.fillText(
                                `+${formatNumber(
                                    stat.value
                                )}${
                                    stat.unit ||
                                    ""
                                }`,
                                columnX +
                                    columnWidth -
                                    45,
                                statY
                            );
                        }
                    );
                }
            );


            /*
             * Move to next category row.
             */

            currentRowY +=
                rowHeight;
        }
    );
}


/*
 * ---------------------------------------------------------------------------
 * MAIN EXPORT
 * ---------------------------------------------------------------------------
 */

export async function exportTalentBuild(
    options: ExportBuildOptions
): Promise<void> {

    const {
        hero,
        selectedTalentNodes,
        talentPoints,
        maxPoints,
        stats,
    } = options;


    const canvas =
    document.createElement(
        "canvas"
    );

const EXPORT_SCALE = 2;

canvas.width =
    EXPORT_WIDTH *
    EXPORT_SCALE;

canvas.height =
    EXPORT_HEIGHT *
    EXPORT_SCALE;


    const ctx =
        canvas.getContext(
            "2d"
        );

    if (!ctx) {

        throw new Error(
            "Could not create export canvas."
        );
    }

    ctx.scale(
    EXPORT_SCALE,
    EXPORT_SCALE
);


    /*
     * -----------------------------------------------------------------------
     * BACKGROUND
     * -----------------------------------------------------------------------
     */

    ctx.fillStyle =
        "#050B16";

    ctx.fillRect(
        0,
        0,
        EXPORT_WIDTH,
        EXPORT_HEIGHT
    );


    /*
     * Cyan radial glow.
     */
    const glow =
        ctx.createRadialGradient(
            EXPORT_WIDTH / 2,
            440,
            80,
            EXPORT_WIDTH / 2,
            440,
            850
        );


    glow.addColorStop(
        0,
        "rgba(14,116,144,0.16)"
    );

    glow.addColorStop(
        0.55,
        "rgba(14,116,144,0.05)"
    );

    glow.addColorStop(
        1,
        "rgba(0,0,0,0)"
    );


    ctx.fillStyle =
        glow;

    ctx.fillRect(
        0,
        0,
        EXPORT_WIDTH,
        EXPORT_HEIGHT
    );


    /*
     * Subtle grid.
     */
    ctx.strokeStyle =
        "rgba(56,189,248,0.055)";

    ctx.lineWidth =
        1;

    const gridSize =
        80;


    for (
        let x = 0;
        x <= EXPORT_WIDTH;
        x += gridSize
    ) {

        ctx.beginPath();

        ctx.moveTo(
            x,
            0
        );

        ctx.lineTo(
            x,
            EXPORT_HEIGHT
        );

        ctx.stroke();
    }


    for (
        let y = 0;
        y <= EXPORT_HEIGHT;
        y += gridSize
    ) {

        ctx.beginPath();

        ctx.moveTo(
            0,
            y
        );

        ctx.lineTo(
            EXPORT_WIDTH,
            y
        );

        ctx.stroke();
    }


    /*
     * Vignette.
     */
    const vignette =
        ctx.createRadialGradient(
            EXPORT_WIDTH / 2,
            EXPORT_HEIGHT / 2,
            300,
            EXPORT_WIDTH / 2,
            EXPORT_HEIGHT / 2,
            1100
        );


    vignette.addColorStop(
        0,
        "rgba(0,0,0,0)"
    );

    vignette.addColorStop(
        1,
        "rgba(0,0,0,0.55)"
    );


    ctx.fillStyle =
        vignette;

    ctx.fillRect(
        0,
        0,
        EXPORT_WIDTH,
        EXPORT_HEIGHT
    );


    /*
     * -----------------------------------------------------------------------
     * HERO HEADER
     * -----------------------------------------------------------------------
     */

    await drawHeroHeader(
        ctx,
        hero,
        talentPoints,
        maxPoints
    );


    /*
     * -----------------------------------------------------------------------
     * TREE
     * -----------------------------------------------------------------------
     */

    if (
        hero.layout.length >
        0
    ) {

        const bounds =
            getTreeBounds(
                hero.layout
            );


        /*
         * Calculate the horizontal scale first.
         *
         * The tree width remains the limiting
         * dimension, exactly as in the current
         * export.
         */
        const scaleX =
            TREE_AREA_WIDTH /
            bounds.width;


        /*
         * The vertical dimension is measured
         * after applying the intentional vertical
         * expansion.
         */
        const effectiveTreeHeight =
            bounds.height *
            TREE_VERTICAL_SCALE;


        const scaleY =
            TREE_AREA_HEIGHT /
            effectiveTreeHeight;


        /*
         * Never enlarge beyond 1x.
         *
         * This keeps the current width behavior
         * intact for very wide trees.
         */
        const scale =
            Math.min(
                scaleX,
                scaleY,
                1
            );


        const renderedWidth =
            bounds.width *
            scale;


        const renderedHeight =
            bounds.height *
            scale *
            TREE_VERTICAL_SCALE;


        const offsetX =
            bounds.minX;

        const offsetY =
            bounds.minY;


        const treeX =
            TREE_AREA_X +
            (
                TREE_AREA_WIDTH -
                renderedWidth
            ) / 2;


        const treeY =
            TREE_AREA_Y +
            (
                TREE_AREA_HEIGHT -
                renderedHeight
            ) / 2;


        /*
         * Tree background panel.
         */
        roundRect(
            ctx,
            treeX - 20,
            treeY - 20,
            renderedWidth + 40,
            renderedHeight + 40,
            22
        );


        ctx.fillStyle =
            "rgba(3,15,30,0.45)";

        ctx.fill();


        ctx.strokeStyle =
            "rgba(56,189,248,0.10)";

        ctx.lineWidth =
            1;

        ctx.stroke();


        /*
         * Draw tree in its own coordinate space.
         */
        ctx.save();


        ctx.translate(
            treeX,
            treeY
        );


        /*
         * Connections first.
         */
        drawConnections(
            ctx,
            hero.layout,
            selectedTalentNodes,
            offsetX,
            offsetY,
            scale
        );


        /*
         * Nodes second.
         */
        await drawTalentNodes(
            ctx,
            hero.layout,
            selectedTalentNodes,
            offsetX,
            offsetY,
            scale
        );


        ctx.restore();
    }


    /*
     * -----------------------------------------------------------------------
     * STATS
     * -----------------------------------------------------------------------
     */

    drawStats(
        ctx,
        stats
    );



    /*
     * -----------------------------------------------------------------------
     * DOWNLOAD
     * -----------------------------------------------------------------------
     */

    const heroName =
        hero.title
            .split(
                " - "
            )[0]
            .replace(
                /[^a-z0-9_-]/gi,
                "_"
            );


    const fileName =
        `SIRO-${heroName}-Talent-Build.png`;


    canvas.toBlob(
        (blob) => {

            if (!blob) {

                console.error(
                    "Could not create PNG."
                );

                return;
            }


            const url =
                URL.createObjectURL(
                    blob
                );


            const link =
                document.createElement(
                    "a"
                );


            link.href =
                url;

            link.download =
                fileName;


            document.body.appendChild(
                link
            );


            link.click();


            document.body.removeChild(
                link
            );


            URL.revokeObjectURL(
                url
            );
        },
        "image/png"
    );
}