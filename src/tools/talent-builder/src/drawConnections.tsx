import React from "react";
import { getCoordinates } from "../headers/position";
import { TalentNode } from "../headers/talent";
import { talents } from "../data/talents";

interface TalentConnectionsProps {
    layout: TalentNode[];
    selectedTalentNodes: Record<number, number>;
}

function isConnectionActive(
    currentId: number,
    requiredId: number,
    selected: Record<number, number>,
    layout: TalentNode[],
    isAny: boolean
) {
    const current = layout.find(t => t.id === currentId);
    const required = layout.find(t => t.id === requiredId);

    if (!current || !required)
        return false;

    const requiredActivated =
        (selected[requiredId] || 0) ===
        (talents[required.talentId].maxPoints || 1);

    const currentActivated =
        (selected[currentId] || 0) >= 1;

    return isAny
        ? requiredActivated && currentActivated
        : currentActivated && requiredActivated;
}

function rowOffset(
    posRow: string,
    fromY: number,
    toY: number
) {
    // Different talent shapes require slightly different alignment.
    if (fromY === toY) return 0;
    if (posRow === "bottom") return 3;
    if (posRow === "top") return 5;
    return 0;
}

export const DrawConnections: React.FC<TalentConnectionsProps> = ({
    layout,
    selectedTalentNodes,
}) => {
    const renderLines = (isAny: boolean) => {
        return layout.flatMap(talentNode => {
            const requirements = isAny
                ? talentNode.requiresAny ?? []
                : talentNode.requires ?? [];

            return requirements.map(
                (requiredTalentNodeId: any) => {
                    const requiredTalentNode = layout.find(
                        tN => tN.id === requiredTalentNodeId
                    );

                    if (!requiredTalentNode)
                        return null;

                    const {
                        x: fromX,
                        y: fromY,
                    } = getCoordinates(
                        requiredTalentNode.pos
                    );

                    const {
                        x: toX,
                        y: toY,
                    } = getCoordinates(
                        talentNode.pos
                    );

                    const dx = toX - fromX;
                    const dy = toY - fromY;

                    const distance = Math.sqrt(
                        dx * dx + dy * dy
                    );

                    if (distance === 0)
                        return null;

                    const nx = dx / distance;
                    const ny = dy / distance;

                    const nodeRadius = 20;

                    const x1 =
                        fromX +
                        20 +
                        nx * nodeRadius -
                        rowOffset(
                            requiredTalentNode.pos.row,
                            fromY,
                            toY
                        ) *
                            (requiredTalentNode.pos.row === "top"
                                ? -1
                                : 1);

                    const y1 =
                        fromY +
                        20 +
                        ny * nodeRadius +
                        rowOffset(
                            requiredTalentNode.pos.row,
                            fromY,
                            toY
                        );

                    const x2 =
                        toX +
                        20 -
                        nx * nodeRadius +
                        rowOffset(
                            talentNode.pos.row,
                            fromY,
                            toY
                        ) *
                            (talentNode.pos.row === "top"
                                ? -1
                                : 1);

                    const y2 =
                        toY +
                        20 -
                        ny * nodeRadius +
                        rowOffset(
                            talentNode.pos.row,
                            fromY,
                            toY
                        );

                    const active = isConnectionActive(
                        talentNode.id,
                        requiredTalentNode.id,
                        selectedTalentNodes,
                        layout,
                        isAny
                    );

                    return active ? (
                        <React.Fragment
                            key={`${
                                isAny ? "req-or" : "req"
                            }-${requiredTalentNode.id}-${talentNode.id}`}
                        >
                            {/* Active connection glow */}
                            <line
                                x1={x1}
                                y1={y1}
                                x2={x2}
                                y2={y2}
                                stroke="#38bdf8"
                                strokeWidth={8}
                                strokeOpacity={0.22}
                                strokeLinecap="round"
                            />

                            {/* Active connection */}
                            <line
                                x1={x1}
                                y1={y1}
                                x2={x2}
                                y2={y2}
                                stroke="#38bdf8"
                                strokeWidth={4}
                                strokeOpacity={0.9}
                                strokeLinecap="round"
                            />
                        </React.Fragment>
                    ) : (
                        <line
                            key={`${
                                isAny ? "req-or" : "req"
                            }-${requiredTalentNode.id}-${talentNode.id}`}
                            x1={x1}
                            y1={y1}
                            x2={x2}
                            y2={y2}
                            stroke="rgba(71, 85, 105, 0.65)"
                            strokeWidth={2}
                            strokeLinecap="round"
                        />
                    );
                }
            );
        });
    };

    return (
        <svg
            className="absolute inset-0 pointer-events-none h-full"
            style={{ width: 3100 }}
        >
            {renderLines(false)}
            {renderLines(true)}
        </svg>
    );
};