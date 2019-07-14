import * as utils from '@interactjs/utils';
function start(arg) {
    const { interaction, interactable, element, rect, state, startOffset } = arg;
    const { options } = state;
    const offsets = [];
    const origin = options.offsetWithOrigin
        ? getOrigin(arg)
        : { x: 0, y: 0 };
    let snapOffset;
    if (options.offset === 'startCoords') {
        snapOffset = {
            x: interaction.coords.start.page.x,
            y: interaction.coords.start.page.y,
        };
    }
    else {
        const offsetRect = utils.rect.resolveRectLike(options.offset, interactable, element, [interaction]);
        snapOffset = utils.rect.rectToXY(offsetRect) || { x: 0, y: 0 };
        snapOffset.x += origin.x;
        snapOffset.y += origin.y;
    }
    const relativePoints = options.relativePoints || [];
    if (rect && options.relativePoints && options.relativePoints.length) {
        for (let index = 0; index < relativePoints.length; index++) {
            const relativePoint = relativePoints[index];
            offsets.push({
                index,
                relativePoint,
                x: startOffset.left - (rect.width * relativePoint.x) + snapOffset.x,
                y: startOffset.top - (rect.height * relativePoint.y) + snapOffset.y,
            });
        }
    }
    else {
        offsets.push(utils.extend({
            index: 0,
            relativePoint: null,
        }, snapOffset));
    }
    state.offsets = offsets;
}
function set(arg) {
    const { interaction, coords, state } = arg;
    const { options, offsets } = state;
    const origin = utils.getOriginXY(interaction.interactable, interaction.element, interaction.prepared.name);
    const page = utils.extend({}, coords);
    const targets = [];
    let target;
    if (!options.offsetWithOrigin) {
        page.x -= origin.x;
        page.y -= origin.y;
    }
    state.realX = page.x;
    state.realY = page.y;
    for (const offset of offsets) {
        const relativeX = page.x - offset.x;
        const relativeY = page.y - offset.y;
        for (let index = 0, len = options.targets.length; index < len; index++) {
            const snapTarget = options.targets[index];
            if (utils.is.func(snapTarget)) {
                target = snapTarget(relativeX, relativeY, interaction, offset, index);
            }
            else {
                target = snapTarget;
            }
            if (!target) {
                continue;
            }
            targets.push({
                x: (utils.is.number(target.x) ? target.x : relativeX) + offset.x,
                y: (utils.is.number(target.y) ? target.y : relativeY) + offset.y,
                range: utils.is.number(target.range) ? target.range : options.range,
            });
        }
    }
    const closest = {
        target: null,
        inRange: false,
        distance: 0,
        range: 0,
        dx: 0,
        dy: 0,
    };
    for (let i = 0, len = targets.length; i < len; i++) {
        target = targets[i];
        const range = target.range;
        const dx = target.x - page.x;
        const dy = target.y - page.y;
        const distance = utils.hypot(dx, dy);
        let inRange = distance <= range;
        // Infinite targets count as being out of range
        // compared to non infinite ones that are in range
        if (range === Infinity && closest.inRange && closest.range !== Infinity) {
            inRange = false;
        }
        if (!closest.target || (inRange
            // is the closest target in range?
            ? (closest.inRange && range !== Infinity
                // the pointer is relatively deeper in this target
                ? distance / range < closest.distance / closest.range
                // this target has Infinite range and the closest doesn't
                : (range === Infinity && closest.range !== Infinity) ||
                    // OR this target is closer that the previous closest
                    distance < closest.distance)
            // The other is not in range and the pointer is closer to this target
            : (!closest.inRange && distance < closest.distance))) {
            closest.target = target;
            closest.distance = distance;
            closest.range = range;
            closest.inRange = inRange;
            closest.dx = dx;
            closest.dy = dy;
            state.range = range;
        }
    }
    if (closest.inRange) {
        coords.x = closest.target.x;
        coords.y = closest.target.y;
    }
    state.closest = closest;
}
function getOrigin(arg) {
    const optionsOrigin = utils.rect.rectToXY(utils.rect.resolveRectLike(arg.state.options.origin));
    const origin = optionsOrigin || utils.getOriginXY(arg.interactable, arg.interaction.element, arg.interaction.prepared.name);
    return origin;
}
const defaults = {
    range: Infinity,
    targets: null,
    offset: null,
    offsetWithOrigin: true,
    relativePoints: null,
    endOnly: false,
    enabled: false,
};
const snap = {
    start,
    set,
    defaults,
};
export default snap;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9pbnRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInBvaW50ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxLQUFLLEtBQUssTUFBTSxtQkFBbUIsQ0FBQTtBQTZCMUMsU0FBUyxLQUFLLENBQUUsR0FBdUI7SUFDckMsTUFBTSxFQUFFLFdBQVcsRUFBRSxZQUFZLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsV0FBVyxFQUFFLEdBQUcsR0FBRyxDQUFBO0lBQzVFLE1BQU0sRUFBRSxPQUFPLEVBQUUsR0FBRyxLQUFLLENBQUE7SUFDekIsTUFBTSxPQUFPLEdBQUcsRUFBRSxDQUFBO0lBQ2xCLE1BQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQyxnQkFBZ0I7UUFDckMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUM7UUFDaEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUE7SUFFbEIsSUFBSSxVQUFVLENBQUE7SUFFZCxJQUFJLE9BQU8sQ0FBQyxNQUFNLEtBQUssYUFBYSxFQUFFO1FBQ3BDLFVBQVUsR0FBRztZQUNYLENBQUMsRUFBRSxXQUFXLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNsQyxDQUFDLEVBQUUsV0FBVyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDbkMsQ0FBQTtLQUNGO1NBQ0s7UUFDSixNQUFNLFVBQVUsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLFlBQVksRUFBRSxPQUFPLEVBQUUsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFBO1FBRW5HLFVBQVUsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMs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O0lBQ2QsT0FBTyxFQUFFLEtBQUs7Q0FDZixDQUFBO0FBQ0QsTUFBTSxJQUFJLEdBQUc7SUFDWCxLQUFLO0lBQ0wsR0FBRztJQUNILFFBQVE7Q0FDVCxDQUFBO0FBRUQsZUFBZSxJQUFJLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyB1dGlscyBmcm9tICdAaW50ZXJhY3Rqcy91dGlscydcblxuZXhwb3J0IGludGVyZmFjZSBTbmFwUG9zaXRpb24ge1xuICB4OiBudW1iZXJcbiAgeTogbnVtYmVyXG4gIHJhbmdlPzogbnVtYmVyXG59XG5cbmV4cG9ydCB0eXBlIFNuYXBGdW5jdGlvbiA9IChcbiAgeDogbnVtYmVyLFxuICB5OiBudW1iZXIsXG4gIGludGVyYWN0aW9uOiBJbnRlcmFjdC5JbnRlcmFjdGlvbixcbiAgb2Zmc2V0OiBJbnRlcmFjdC5Qb2ludCxcbiAgaW5kZXg6IG51bWJlclxuKSA9PiBTbmFwUG9zaXRpb25cbmV4cG9ydCB0eXBlIFNuYXBUYXJnZXQgPSBTbmFwUG9zaXRpb24gfCBTbmFwRnVuY3Rpb25cbmV4cG9ydCBpbnRlcmZhY2UgU25hcE9wdGlvbnMge1xuICB0YXJnZXRzOiBTbmFwVGFyZ2V0W11cbiAgLy8gdGFyZ2V0IHJhbmdlXG4gIHJhbmdlOiBudW1iZXJcbiAgLy8gc2VsZiBwb2ludHMgZm9yIHNuYXBwaW5nLiBbMCwwXSA9IHRvcCBsZWZ0LCBbMSwxXSA9IGJvdHRvbSByaWdodFxuICByZWxhdGl2ZVBvaW50czogSW50ZXJhY3QuUG9pbnRbXVxuICAvLyBzdGFydENvb3JkcyA9IG9mZnNldCBzbmFwcGluZyBmcm9tIGRyYWcgc3RhcnQgcGFnZSBwb3NpdGlvblxuICBvZmZzZXQ6IEludGVyYWN0LlBvaW50IHwgSW50ZXJhY3QuUmVjdFJlc29sdmFibGU8W0ludGVyYWN0LkludGVyYWN0aW9uXT4gfCAnc3RhcnRDb29yZHMnXG4gIG9mZnNldFdpdGhPcmlnaW46IGJvb2xlYW4sXG4gIGVuZE9ubHk6IGJvb2xlYW5cbiAgZW5hYmxlZDogYm9vbGVhbixcbn1cblxuZnVuY3Rpb24gc3RhcnQgKGFyZzogSW50ZXJhY3QuU2lnbmFsQXJnKSB7XG4gIGNvbnN0IHsgaW50ZXJhY3Rpb24sIGludGVyYWN0YWJsZSwgZWxlbWVudCwgcmVjdCwgc3RhdGUsIHN0YXJ0T2Zmc2V0IH0gPSBhcmdcbiAgY29uc3QgeyBvcHRpb25zIH0gPSBzdGF0ZVxuICBjb25zdCBvZmZzZXRzID0gW11cbiAgY29uc3Qgb3JpZ2luID0gb3B0aW9ucy5vZmZzZXRXaXRoT3JpZ2luXG4gICAgPyBnZXRPcmlnaW4oYXJnKVxuICAgIDogeyB4OiAwLCB5OiAwIH1cblxuICBsZXQgc25hcE9mZnNldFxuXG4gIGlmIChvcHRpb25zLm9mZnNldCA9PT0gJ3N0YXJ0Q29vcmRzJykge1xuICAgIHNuYXBPZmZzZXQgPSB7XG4gICAgICB4OiBpbnRlcmFjdGlvbi5jb29yZHMuc3RhcnQucGFnZS54LFxuICAgICAgeTogaW50ZXJhY3Rpb24uY29vcmRzLnN0YXJ0LnBhZ2UueSxcbiAgICB9XG4gIH1cbiAgZWxzZSAge1xuICAgIGNvbnN0IG9mZnNldFJlY3QgPSB1dGlscy5yZWN0LnJlc29sdmVSZWN0TGlrZShvcHRpb25zLm9mZnNldCwgaW50ZXJhY3RhYmxlLCBlbGVtZW50LCBbaW50ZXJhY3Rpb25dKVxuXG4gICAgc25hcE9mZnNldCA9IHV0aWxzLnJlY3QucmVjdFRvWFkob2Zmc2V0UmVjdCkgfHwgeyB4OiAwLCB5OiAwIH1cbiAgICBzbmFwT2Zmc2V0LnggKz0gb3JpZ2luLnhcbiAgICBzbmFwT2Zmc2V0LnkgKz0gb3JpZ2luLnlcbiAgfVxuXG4gIGNvbnN0IHJlbGF0aXZlUG9pbnRzID0gb3B0aW9ucy5yZWxhdGl2ZVBvaW50cyB8fCBbXVxuXG4gIGlmIChyZWN0ICYmIG9wdGlvbnMucmVsYXRpdmVQb2ludHMgJiYgb3B0aW9ucy5yZWxhdGl2ZVBvaW50cy5sZW5ndGgpIHtcbiAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgcmVsYXRpdmVQb2ludHMubGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgICBjb25zdCByZWxhdGl2ZVBvaW50ID0gcmVsYXRpdmVQb2ludHNbaW5kZXhdXG5cbiAgICAgIG9mZnNldHMucHVzaCh7XG4gICAgICAgIGluZGV4LFxuICAgICAgICByZWxhdGl2ZVBvaW50LFxuICAgICAgICB4OiBzdGFydE9mZnNldC5sZWZ0IC0gKHJlY3Qud2lkdGggICogcmVsYXRpdmVQb2ludC54KSArIHNuYXBPZmZzZXQueCxcbiAgICAgICAgeTogc3RhcnRPZmZzZXQudG9wICAtIChyZWN0LmhlaWdodCAqIHJlbGF0aXZlUG9pbnQueSkgKyBzbmFwT2Zmc2V0LnksXG4gICAgICB9KVxuICAgIH1cbiAgfVxuICBlbHNlIHtcbiAgICBvZmZzZXRzLnB1c2godXRpbHMuZXh0ZW5kKHtcbiAgICAgIGluZGV4OiAwLFxuICAgICAgcmVsYXRpdmVQb2ludDogbnVsbCxcbiAgICB9LCBzbmFwT2Zmc2V0KSlcbiAgfVxuXG4gIHN0YXRlLm9mZnNldHMgPSBvZmZzZXRzXG59XG5cbmZ1bmN0aW9uIHNldCAoYXJnOiBJbnRlcmFjdC5TaWduYWxBcmcpIHtcbiAgY29uc3QgeyBpbnRlcmFjdGlvbiwgY29vcmRzLCBzdGF0ZSB9ID0gYXJnXG4gIGNvbnN0IHsgb3B0aW9ucywgb2Zmc2V0cyB9ID0gc3RhdGVcblxuICBjb25zdCBvcmlnaW4gPSB1dGlscy5nZXRPcmlnaW5YWShpbnRlcmFjdGlvbi5pbnRlcmFjdGFibGUsIGludGVyYWN0aW9uLmVsZW1lbnQsIGludGVyYWN0aW9uLnByZXBhcmVkLm5hbWUpXG4gIGNvbnN0IHBhZ2UgPSB1dGlscy5leHRlbmQoe30sIGNvb3JkcylcbiAgY29uc3QgdGFyZ2V0cyA9IFtdXG4gIGxldCB0YXJnZXRcblxuICBpZiAoIW9wdGlvbnMub2Zmc2V0V2l0aE9yaWdpbikge1xuICAgIHBhZ2UueCAtPSBvcmlnaW4ueFxuICAgIHBhZ2UueSAtPSBvcmlnaW4ueVxuICB9XG5cbiAgc3RhdGUucmVhbFggPSBwYWdlLnhcbiAgc3RhdGUucmVhbFkgPSBwYWdlLnlcblxuICBmb3IgKGNvbnN0IG9mZnNldCBvZiBvZmZzZXRzKSB7XG4gICAgY29uc3QgcmVsYXRpdmVYID0gcGFnZS54IC0gb2Zmc2V0LnhcbiAgICBjb25zdCByZWxhdGl2ZVkgPSBwYWdlLnkgLSBvZmZzZXQueVxuXG4gICAgZm9yIChsZXQgaW5kZXggPSAwLCBsZW4gPSBvcHRpb25zLnRhcmdldHMubGVuZ3RoOyBpbmRleCA8IGxlbjsgaW5kZXgrKykge1xuICAgICAgY29uc3Qgc25hcFRhcmdldCA9IG9wdGlvbnMudGFyZ2V0c1tpbmRleF1cbiAgICAgIGlmICh1dGlscy5pcy5mdW5jKHNuYXBUYXJnZXQpKSB7XG4gICAgICAgIHRhcmdldCA9IHNuYXBUYXJnZXQocmVsYXRpdmVYLCByZWxhdGl2ZVksIGludGVyYWN0aW9uLCBvZmZzZXQsIGluZGV4KVxuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIHRhcmdldCA9IHNuYXBUYXJnZXRcbiAgICAgIH1cblxuICAgICAgaWYgKCF0YXJnZXQpIHsgY29udGludWUgfVxuXG4gICAgICB0YXJnZXRzLnB1c2goe1xuICAgICAgICB4OiAodXRpbHMuaXMubnVtYmVyKHRhcmdldC54KSA/IHRhcmdldC54IDogcmVsYXRpdmVYKSArIG9mZnNldC54LFxuICAgICAgICB5OiAodXRpbHMuaXMubnVtYmVyKHRhcmdldC55KSA/IHRhcmdldC55IDogcmVsYXRpdmVZKSArIG9mZnNldC55LFxuXG4gICAgICAgIHJhbmdlOiB1dGlscy5pcy5udW1iZXIodGFyZ2V0LnJhbmdlKSA/IHRhcmdldC5yYW5nZSA6IG9wdGlvbnMucmFuZ2UsXG4gICAgICB9KVxuICAgIH1cbiAgfVxuXG4gIGNvbnN0IGNsb3Nlc3QgPSB7XG4gICAgdGFyZ2V0OiBudWxsLFxuICAgIGluUmFuZ2U6IGZhbHNlLFxuICAgIGRpc3RhbmNlOiAwLFxuICAgIHJhbmdlOiAwLFxuICAgIGR4OiAwLFxuICAgIGR5OiAwLFxuICB9XG5cbiAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IHRhcmdldHMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICB0YXJnZXQgPSB0YXJnZXRzW2ldXG5cbiAgICBjb25zdCByYW5nZSA9IHRhcmdldC5yYW5nZVxuICAgIGNvbnN0IGR4ID0gdGFyZ2V0LnggLSBwYWdlLnhcbiAgICBjb25zdCBkeSA9IHRhcmdldC55IC0gcGFnZS55XG4gICAgY29uc3QgZGlzdGFuY2UgPSB1dGlscy5oeXBvdChkeCwgZHkpXG4gICAgbGV0IGluUmFuZ2UgPSBkaXN0YW5jZSA8PSByYW5nZVxuXG4gICAgLy8gSW5maW5pdGUgdGFyZ2V0cyBjb3VudCBhcyBiZWluZyBvdXQgb2YgcmFuZ2VcbiAgICAvLyBjb21wYXJlZCB0byBub24gaW5maW5pdGUgb25lcyB0aGF0IGFyZSBpbiByYW5nZVxuICAgIGlmIChyYW5nZSA9PT0gSW5maW5pdHkgJiYgY2xvc2VzdC5pblJhbmdlICYmIGNsb3Nlc3QucmFuZ2UgIT09IEluZmluaXR5KSB7XG4gICAgICBpblJhbmdlID0gZmFsc2VcbiAgICB9XG5cbiAgICBpZiAoIWNsb3Nlc3QudGFyZ2V0IHx8IChpblJhbmdlXG4gICAgICAvLyBpcyB0aGUgY2xvc2VzdCB0YXJnZXQgaW4gcmFuZ2U/XG4gICAgICA/IChjbG9zZXN0LmluUmFuZ2UgJiYgcmFuZ2UgIT09IEluZmluaXR5XG4gICAgICAgIC8vIHRoZSBwb2ludGVyIGlzIHJlbGF0aXZlbHkgZGVlcGVyIGluIHRoaXMgdGFyZ2V0XG4gICAgICAgID8gZGlzdGFuY2UgLyByYW5nZSA8IGNsb3Nlc3QuZGlzdGFuY2UgLyBjbG9zZXN0LnJhbmdlXG4gICAgICAgIC8vIHRoaXMgdGFyZ2V0IGhhcyBJbmZpbml0ZSByYW5nZSBhbmQgdGhlIGNsb3Nlc3QgZG9lc24ndFxuICAgICAgICA6IChyYW5nZSA9PT0gSW5maW5pdHkgJiYgY2xvc2VzdC5yYW5nZSAhPT0gSW5maW5pdHkpIHx8XG4gICAgICAgICAgLy8gT1IgdGhpcyB0YXJnZXQgaXMgY2xvc2VyIHRoYXQgdGhlIHByZXZpb3VzIGNsb3Nlc3RcbiAgICAgICAgICBkaXN0YW5jZSA8IGNsb3Nlc3QuZGlzdGFuY2UpXG4gICAgICAvLyBUaGUgb3RoZXIgaXMgbm90IGluIHJhbmdlIGFuZCB0aGUgcG9pbnRlciBpcyBjbG9zZXIgdG8gdGhpcyB0YXJnZXRcbiAgICAgIDogKCFjbG9zZXN0LmluUmFuZ2UgJiYgZGlzdGFuY2UgPCBjbG9zZXN0LmRpc3RhbmNlKSkpIHtcbiAgICAgIGNsb3Nlc3QudGFyZ2V0ID0gdGFyZ2V0XG4gICAgICBjbG9zZXN0LmRpc3RhbmNlID0gZGlzdGFuY2VcbiAgICAgIGNsb3Nlc3QucmFuZ2UgPSByYW5nZVxuICAgICAgY2xvc2VzdC5pblJhbmdlID0gaW5SYW5nZVxuICAgICAgY2xvc2VzdC5keCA9IGR4XG4gICAgICBjbG9zZXN0LmR5ID0gZHlcblxuICAgICAgc3RhdGUucmFuZ2UgPSByYW5nZVxuICAgIH1cbiAgfVxuXG4gIGlmIChjbG9zZXN0LmluUmFuZ2UpIHtcbiAgICBjb29yZHMueCA9IGNsb3Nlc3QudGFyZ2V0LnhcbiAgICBjb29yZHMueSA9IGNsb3Nlc3QudGFyZ2V0LnlcbiAgfVxuXG4gIHN0YXRlLmNsb3Nlc3QgPSBjbG9zZXN0XG59XG5cbmZ1bmN0aW9uIGdldE9yaWdpbiAoYXJnOiBQYXJ0aWFsPEludGVyYWN0LlNpZ25hbEFyZz4pIHtcbiAgY29uc3Qgb3B0aW9uc09yaWdpbiA9IHV0aWxzLnJlY3QucmVjdFRvWFkoXG4gICAgdXRpbHMucmVjdC5yZXNvbHZlUmVjdExpa2UoYXJnLnN0YXRlLm9wdGlvbnMub3JpZ2luKVxuICApXG4gIGNvbnN0IG9yaWdpbiA9IG9wdGlvbnNPcmlnaW4gfHwgdXRpbHMuZ2V0T3JpZ2luWFkoXG4gICAgYXJnLmludGVyYWN0YWJsZSxcbiAgICBhcmcuaW50ZXJhY3Rpb24uZWxlbWVudCxcbiAgICBhcmcuaW50ZXJhY3Rpb24ucHJlcGFyZWQubmFtZSxcbiAgKVxuXG4gIHJldHVybiBvcmlnaW5cbn1cblxuY29uc3QgZGVmYXVsdHM6IFNuYXBPcHRpb25zID0ge1xuICByYW5nZSAgOiBJbmZpbml0eSxcbiAgdGFyZ2V0czogbnVsbCxcbiAgb2Zmc2V0OiBudWxsLFxuICBvZmZzZXRXaXRoT3JpZ2luOiB0cnVlLFxuICByZWxhdGl2ZVBvaW50czogbnVsbCxcbiAgZW5kT25seTogZmFsc2UsXG4gIGVuYWJsZWQ6IGZhbHNlLFxufVxuY29uc3Qgc25hcCA9IHtcbiAgc3RhcnQsXG4gIHNldCxcbiAgZGVmYXVsdHMsXG59XG5cbmV4cG9ydCBkZWZhdWx0IHNuYXBcbiJdfQ==