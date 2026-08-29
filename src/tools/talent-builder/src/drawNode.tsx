import { auras } from "../data/auras";
import { talents } from "../data/talents";
import { getCoordinates } from "../headers/position";
import { TalentNode } from "../headers/talent";
import { canIncrease, handleLeftClick, handleRightClick } from "./edit";
import { getShape } from "./shape";
import { useState } from "react";

type DrawNodeProps = {
    talentNode: TalentNode;
    selectedTalentNodes: Record<number, number>;
    setSelectedTalentNodes: React.Dispatch<React.SetStateAction<Record<number, number>>>;
    layout: TalentNode[];
    talentPoints: number;
    allowEdit: boolean;
    mobileTooltipTalentId: number | null;
    setMobileTooltipTalentId: React.Dispatch<React.SetStateAction<number | null>>;
};

export const DrawNode: React.FC<DrawNodeProps> = ({
    talentNode,
    selectedTalentNodes,
    setSelectedTalentNodes,
    layout,
    talentPoints,
    allowEdit,
    mobileTooltipTalentId,
    setMobileTooltipTalentId
}) => {
    const { x, y } = getCoordinates(talentNode.pos);

    const talent = talents[talentNode.talentId];
    const aura = auras[talent.auraId];

    const currentPoints = selectedTalentNodes[talentNode.id] ?? 0;
    const maxPoints = talent.maxPoints ?? 1;
    const isEnhanced = talentNode.enhanced ?? false;

    const isActive = currentPoints > 0;


    const value = Math.max(1, currentPoints) * talent.modifier;

    const tooltipDescription = aura.effect.replace("{value}", `${value}`);

    const nextLevelText = currentPoints > 0 && currentPoints < maxPoints
        ? `[Next level: ${(currentPoints + 1) * talent.modifier}${aura.unit}]`
        : null;

    const showTop = y < 80;

    const talentImage = talent.image
        ? `${talent.image.replace(".png", "")}${isActive ? "_selected" : ""}.png`
        : "placeholder.png";

    const shape = getShape(talentNode);

    const backgroundColor = isActive
    ? isEnhanced
        ? "rgba(120, 83, 15, 0.85)"
        : "rgba(8, 47, 73, 0.95)"
    : "rgba(3, 15, 30, 0.95)";

const borderColor = isActive
    ? isEnhanced
        ? "#facc15"
        : "#38bdf8"
    : "rgba(56, 189, 248, 0.28)";

    const cursor =
        allowEdit && canIncrease(layout, selectedTalentNodes, talentNode)
            ? "pointer"
            : "default";

    const handleClick = allowEdit
    ? () => {
        if (
            typeof window !== "undefined" &&
            window.matchMedia("(pointer: coarse)").matches
        ) {
            setMobileTooltipTalentId((current) =>
                current === talentNode.id
                    ? null
                    : talentNode.id
            );
        }

        handleLeftClick(
            talentNode,
            selectedTalentNodes,
            setSelectedTalentNodes,
            layout,
            talentPoints
        );
    }
    : undefined;

    const handleContextMenu = allowEdit
        ? (e: React.MouseEvent) =>
            handleRightClick(e, talentNode, selectedTalentNodes, setSelectedTalentNodes, layout)
        : undefined;

    const nodeShadow = isActive
    ? isEnhanced
        ? "0 0 18px rgba(250, 204, 21, 0.45)"
        : "0 0 18px rgba(56, 189, 248, 0.45)"
    : "0 0 8px rgba(56, 189, 248, 0.08)";

    const isTouchDevice =
    typeof window !== "undefined" &&
    window.matchMedia("(pointer: coarse)").matches;

    return (
        <div
            className="absolute flex flex-col items-center talent-node-interactive select-none"
            data-talent-node="true"
            style={{ left: x, top: y }}
            onClick={handleClick}
            onContextMenu={handleContextMenu}
        >
            <div className="relative group">
                <div className="relative w-10 h-10 flex items-center justify-center">
                    {talentNode.enhanced && (
                        <div
                            className={`absolute w-9 h-9 rotate-45 ${isActive ? "animate-pulsate" : ""}`}
                            style={{
                                backgroundColor,
                                border: `2px solid ${borderColor}`,
                                zIndex: 0,
                            }}
                        />
                    )}
                    <div
    className={`w-10 h-10 ${shape} border-2 flex items-center justify-center transition-all duration-150 ${
        isActive ? "animate-pulsate" : ""
    }`}
    style={{
        backgroundColor,
        borderColor,
        cursor,
        zIndex: 10,
        boxShadow: nodeShadow,
        transform: isActive ? "scale(1.05)" : "scale(1)",
    }}
>
                        <img
                            src={`/images/talent-builder/icons/${talentImage}`}
                            alt={talent.title}
                            className="w-6 h-6"
                        />
                    </div>
                </div>

                {/* TOOLTIP */}
                {tooltipDescription && (

                    <div
    className={`absolute ${
        isTouchDevice && mobileTooltipTalentId === talentNode.id
            ? "flex"
            : "hidden group-hover:flex"
    } flex-col items-center z-50 ${
        showTop
            ? "top-full mt-2"
            : "bottom-full mb-2"
    }`}
>
                        {/* Arrow (top) */}
                        {showTop && (
                            <div className="w-3 h-3 mr-50 bg-gray-900 rotate-45 -mb-1" />
                        )}

                        {/* Content */}
                        <div className="bg-gray-900 text-white text-xs rounded-lg shadow-lg px-3 py-2 text-center w-60">
                            <strong>
    <span className="text-sky-400">
        {talent.title}
    </span>{" "}
    <span className="text-white">
        ({currentPoints}/{maxPoints})
    </span>
</strong>

                            <p className="mb-2">
                                {tooltipDescription}
                                {nextLevelText && (
                                    <>
                                        <br />
                                        {nextLevelText}
                                    </>
                                )}
                            </p>
                        </div>

                        {/* Arrow (bottom) */}
                        {!showTop && (
                            <div className="w-3 h-3 mr-50 bg-gray-900 rotate-45 -mt-1.5" />
                        )}
                    </div>
                )}
            </div>

            {/* POINT COUNTER */}
            <span
    className={`mt-1 rounded-md px-1.5 py-0.5 text-xs font-semibold transition-all duration-150 ${
        isActive
            ? "bg-sky-400/15 text-sky-300"
            : "text-slate-400"
    }`}
>
    {currentPoints}/{maxPoints}
</span>
        </div>
    );
};