export function statusComponent(text, color) {
    return `<span class="text-${color}-500">
                <span class="status-dot status-dot-${color}"></span><span class="text-[1.05rem]">${text}</span>
            </span>`
}
