export function encodeTalentData(selected: Record<number, number>, layout: { id: number }[]): string {
    const values = layout.map(node => selected[node.id] ?? 0);
    
    return values.map(v => v.toString(36)).join("");
}

export function decodeTalentData(encoded: string | null, layout: { id: number }[]): Record<number, number> {
    if (!encoded) return {};

    const result: Record<number, number> = {};

    for (let i = 0; i < encoded.length; i++) {
        const value = parseInt(encoded[i], 36);
        if (value > 0) {
            result[layout[i].id] = value;
        }
    }

    return result;
}