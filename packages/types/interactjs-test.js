// eslint-disable-next-line node/no-extraneous-import
import interact from 'interactjs';
// Interactables
interact(document.body);
interact(document);
interact(window);
interact('.drag-and-resize')
    .draggable({
    modifiers: [
        interact.modifiers.snap({
            targets: [
                { x: 100, y: 200 },
                (x, y) => ({ x: x % 20, y }),
            ],
            offset: 'startCoords',
            relativePoints: [{ x: 0, y: 1 }],
            endOnly: true,
        }),
        interact.modifiers.snapSize({
            targets: [
                { x: 100, y: 200 },
                (x, y) => ({ x: x % 20, y }),
            ],
            endOnly: true,
        }),
        interact.modifiers.restrictRect({
            restriction: 'parent',
            endOnly: true,
        }),
        interact.modifiers.restrict({
            restriction: (_) => ({ top: 0, left: 0, bottom: 1, right: 1 }),
        }),
        interact.modifiers.restrict({
            restriction: (_) => document.body,
        }),
        interact.modifiers.restrictSize({
            min: document.body,
            max: 'parent',
        }),
        interact.modifiers.restrictEdges({
            inner: document.body,
            outer: 'parent',
        }),
    ],
})
    .resizable({
    inertia: true,
});
// Selector context
const myList = document.querySelector('#my-list');
interact('li', {
    context: myList,
})
    .draggable({ /* ... */});
// Action options
const target = 'li';
interact(target)
    .draggable({
    max: 1,
    maxPerElement: 2,
    manualStart: true,
    modifiers: [],
    inertia: { /* ... */},
    autoScroll: { /* ... */},
    lockAxis: 'x' || 'y' || 'start',
    startAxis: 'x' || 'y',
})
    .resizable({
    max: 1,
    maxPerElement: 2,
    manualStart: true,
    modifiers: [],
    inertia: { /* ... */},
    autoScroll: { /* ... */},
    margin: 50,
    square: true || false,
    axis: 'x' || 'y',
})
    .gesturable({
    max: 1,
    maxPerElement: 2,
    manualStart: true,
    modifiers: [],
});
// autoscroll
const element = 'li';
interact(element)
    .draggable({
    autoScroll: true,
})
    .resizable({
    autoScroll: {
        container: document.body,
        margin: 50,
        distance: 5,
        interval: 10,
    },
});
// axis
interact(target).draggable({
    axis: 'x',
});
interact(target).resizable({
    axis: 'x',
});
const handleEl = 'li';
interact(target).resizable({
    edges: {
        top: true,
        left: false,
        bottom: '.resize-s',
        right: handleEl,
    },
});
// resize invert
interact(target).resizable({
    edges: { bottom: true, right: true },
    invert: 'reposition',
});
// resize square
interact(target).resizable({
    squareResize: true,
});
// dropzone  accept
interact(target).dropzone({
    accept: '.drag0, .drag1',
});
// dropzone overlap
interact(target).dropzone({
    overlap: 0.25,
});
// dropzone checker
interact(target).dropzone({
    checker(_dragEvent, // related dragmove or dragend
    _event, // Touch, Pointer or Mouse Event
    dropped, // bool default checker result
    _dropzone, // dropzone Interactable
    dropElement, // dropzone elemnt
    _draggable, // draggable Interactable
    _draggableElement) {
        // only allow drops into empty dropzone elements
        return dropped && !dropElement.hasChildNodes();
    },
});
interact.dynamicDrop();
interact.dynamicDrop(false);
// Events
function listener(event) {
    const { type, pageX, pageY } = event;
    alert({ type, pageX, pageY });
}
interact(target)
    .on('dragstart', listener)
    .on('dragmove dragend', listener)
    .on(['resizemove', 'resizeend'], listener)
    .on({
    gesturestart: listener,
    gestureend: listener,
});
interact.on('resize', (event) => {
    const { rect, deltaRect } = event;
    alert(JSON.stringify({ rect, deltaRect }));
});
interact(target).resizable({
    listeners: [
        { start: listener, move: listener },
    ],
});
interact(target).draggable({
    listeners: { start: listener, end: listener },
});
interact(target).draggable({
    onstart: listener,
    onmove: listener,
    onend: listener,
});
interact.on(['dragmove', 'resizestart'], listener);
const dropTarget = 'div';
// Drop Events
interact(dropTarget)
    .dropzone({
    ondrop(event) {
        alert(event.relatedTarget.id +
            ' was dropped into ' +
            event.target.id);
    },
})
    .on('dropactivate', (event) => {
    event.target.classList.add('drop-activated');
});
interact(target).on('up', (_event) => { });
// fast click
interact('a[href]').on('tap', (event) => {
    window.location.href = event.currentTarget.href;
    event.preventDefault();
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW50ZXJhY3Rqcy10ZXN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiaW50ZXJhY3Rqcy10ZXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLHFEQUFxRDtBQUNyRCxPQUFPLFFBQVEsTUFBTSxZQUFZLENBQUE7QUFFakMsZ0JBQWdCO0FBQ2hCLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUE7QUFDdkIsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFBO0FBQ2xCLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQTtBQUVoQixRQUFRLENBQUMsa0JBQWtCLENBQUM7S0FDekIsU0FBUyxDQUFDO0lBQ1QsU0FBUyxFQUFFO1FBQ1QsUUFBUSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUM7WUFDdEIsT0FBTyxFQUFFO2dCQUNQLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFO2dCQUNsQixDQUFDLENBQVMsRUFBRSxDQUFTLEVBQUUsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQzthQUM3QztZQUNELE1BQU0sRUFBRSxhQUFhO1lBQ3JCLGNBQWMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUM7WUFDaEMsT0FBTyxFQUFFLElBQUk7U0FDZCxDQUFDO1FBQ0YsUUFBUSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUM7WUFDMUIsT0FBTyxFQUFFO2dCQUNQLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFO2dCQUNsQixDQUFDLENBQVMsRUFBRSxDQUFTLEVBQUUsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQzthQUM3QztZQUNELE9BQU8sRUFBRSxJQUFJO1NBQ2QsQ0FBQztRQUNGLFFB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S0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFBO0FBQ3hCLENBQUMsQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vZGUvbm8tZXh0cmFuZW91cy1pbXBvcnRcbmltcG9ydCBpbnRlcmFjdCBmcm9tICdpbnRlcmFjdGpzJ1xuXG4vLyBJbnRlcmFjdGFibGVzXG5pbnRlcmFjdChkb2N1bWVudC5ib2R5KVxuaW50ZXJhY3QoZG9jdW1lbnQpXG5pbnRlcmFjdCh3aW5kb3cpXG5cbmludGVyYWN0KCcuZHJhZy1hbmQtcmVzaXplJylcbiAgLmRyYWdnYWJsZSh7XG4gICAgbW9kaWZpZXJzOiBbXG4gICAgICBpbnRlcmFjdC5tb2RpZmllcnMuc25hcCh7XG4gICAgICAgIHRhcmdldHM6IFtcbiAgICAgICAgICB7IHg6IDEwMCwgeTogMjAwIH0sXG4gICAgICAgICAgKHg6IG51bWJlciwgeTogbnVtYmVyKSA9PiAoeyB4OiB4ICUgMjAsIHkgfSksXG4gICAgICAgIF0sXG4gICAgICAgIG9mZnNldDogJ3N0YXJ0Q29vcmRzJyxcbiAgICAgICAgcmVsYXRpdmVQb2ludHM6IFt7IHg6IDAsIHk6IDEgfV0sXG4gICAgICAgIGVuZE9ubHk6IHRydWUsXG4gICAgICB9KSxcbiAgICAgIGludGVyYWN0Lm1vZGlmaWVycy5zbmFwU2l6ZSh7XG4gICAgICAgIHRhcmdldHM6IFtcbiAgICAgICAgICB7IHg6IDEwMCwgeTogMjAwIH0sXG4gICAgICAgICAgKHg6IG51bWJlciwgeTogbnVtYmVyKSA9PiAoeyB4OiB4ICUgMjAsIHkgfSksXG4gICAgICAgIF0sXG4gICAgICAgIGVuZE9ubHk6IHRydWUsXG4gICAgICB9KSxcbiAgICAgIGludGVyYWN0Lm1vZGlmaWVycy5yZXN0cmljdFJlY3Qoe1xuICAgICAgICByZXN0cmljdGlvbjogJ3BhcmVudCcsXG4gICAgICAgIGVuZE9ubHk6IHRydWUsXG4gICAgICB9KSxcbiAgICAgIGludGVyYWN0Lm1vZGlmaWVycy5yZXN0cmljdCh7XG4gICAgICAgIHJlc3RyaWN0aW9uOiAoXykgPT4gKHsgdG9wOiAwLCBsZWZ0OiAwLCBib3R0b206IDEsIHJpZ2h0OiAxIH0pLFxuICAgICAgfSksXG4gICAgICBpbnRlcmFjdC5tb2RpZmllcnMucmVzdHJpY3Qoe1xuICAgICAgICByZXN0cmljdGlvbjogKF8pID0+IGRvY3VtZW50LmJvZHksXG4gICAgICB9KSxcbiAgICAgIGludGVyYWN0Lm1vZGlmaWVycy5yZXN0cmljdFNpemUoe1xuICAgICAgICBtaW46IGRvY3VtZW50LmJvZHksXG4gICAgICAgIG1heDogJ3BhcmVudCcsXG4gICAgICB9KSxcbiAgICAgIGludGVyYWN0Lm1vZGlmaWVycy5yZXN0cmljdEVkZ2VzKHtcbiAgICAgICAgaW5uZXI6IGRvY3VtZW50LmJvZHksXG4gICAgICAgIG91dGVyOiAncGFyZW50JyxcbiAgICAgIH0pLFxuICAgIF0sXG4gIH0pXG4gIC5yZXNpemFibGUoe1xuICAgIGluZXJ0aWE6IHRydWUsXG4gIH0pXG5cbi8vIFNlbGVjdG9yIGNvbnRleHRcbmNvbnN0IG15TGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNteS1saXN0JylcblxuaW50ZXJhY3QoJ2xpJywge1xuICBjb250ZXh0OiBteUxpc3QsXG59KVxuICAuZHJhZ2dhYmxlKHsgLyogLi4uICovIH0pXG5cbi8vIEFjdGlvbiBvcHRpb25zXG5jb25zdCB0YXJnZXQgPSAnbGknXG5pbnRlcmFjdCh0YXJnZXQpXG4gIC5kcmFnZ2FibGUoe1xuICAgIG1heCAgICAgICAgICA6IDEsXG4gICAgbWF4UGVyRWxlbWVudDogMixcbiAgICBtYW51YWxTdGFydCAgOiB0cnVlLFxuICAgIG1vZGlmaWVycyAgICA6IFtdLFxuICAgIGluZXJ0aWEgICAgICA6IHsvKiAuLi4gKi99LFxuICAgIGF1dG9TY3JvbGwgICA6IHsvKiAuLi4gKi99LFxuXG4gICAgbG9ja0F4aXMgICAgIDogJ3gnIHx8ICd5JyB8fCAnc3RhcnQnLFxuICAgIHN0YXJ0QXhpcyAgICA6ICd4JyB8fCAneScsXG4gIH0pXG4gIC5yZXNpemFibGUoe1xuICAgIG1heCAgICAgICAgICA6IDEsXG4gICAgbWF4UGVyRWxlbWVudDogMixcbiAgICBtYW51YWxTdGFydCAgOiB0cnVlLFxuICAgIG1vZGlmaWVycyAgICA6IFtdLFxuICAgIGluZXJ0aWEgICAgICA6IHsvKiAuLi4gKi99LFxuICAgIGF1dG9TY3JvbGwgICA6IHsvKiAuLi4gKi99LFxuICAgIG1hcmdpbiAgICAgICA6IDUwLFxuXG4gICAgc3F1YXJlICAgICAgIDogdHJ1ZSB8fCBmYWxzZSxcbiAgICBheGlzICAgICAgICAgOiAneCcgfHwgJ3knLFxuICB9KVxuICAuZ2VzdHVyYWJsZSh7XG4gICAgbWF4ICAgICAgICAgIDogMSxcbiAgICBtYXhQZXJFbGVtZW50OiAyLFxuICAgIG1hbnVhbFN0YXJ0ICA6IHRydWUsXG4gICAgbW9kaWZpZXJzICAgIDogW10sXG4gIH0pXG5cbi8vIGF1dG9zY3JvbGxcbmNvbnN0IGVsZW1lbnQgPSAnbGknXG5pbnRlcmFjdChlbGVtZW50KVxuICAuZHJhZ2dhYmxlKHtcbiAgICBhdXRvU2Nyb2xsOiB0cnVlLFxuICB9KVxuICAucmVzaXphYmxlKHtcbiAgICBhdXRvU2Nyb2xsOiB7XG4gICAgICBjb250YWluZXI6IGRvY3VtZW50LmJvZHksXG4gICAgICBtYXJnaW46IDUwLFxuICAgICAgZGlzdGFuY2U6IDUsXG4gICAgICBpbnRlcnZhbDogMTAsXG4gICAgfSxcbiAgfSlcblxuLy8gYXhpc1xuaW50ZXJhY3QodGFyZ2V0KS5kcmFnZ2FibGUoe1xuICBheGlzOiAneCcsXG59KVxuXG5pbnRlcmFjdCh0YXJnZXQpLnJlc2l6YWJsZSh7XG4gIGF4aXM6ICd4Jyxcbn0pXG5cbmNvbnN0IGhhbmRsZUVsID0gJ2xpJ1xuaW50ZXJhY3QodGFyZ2V0KS5yZXNpemFibGUoe1xuICBlZGdlczoge1xuICAgIHRvcCAgIDogdHJ1ZSwgICAgICAgLy8gVXNlIHBvaW50ZXIgY29vcmRzIHRvIGNoZWNrIGZvciByZXNpemUuXG4gICAgbGVmdCAgOiBmYWxzZSwgICAgICAvLyBEaXNhYmxlIHJlc2l6aW5nIGZyb20gbGVmdCBlZGdlLlxuICAgIGJvdHRvbTogJy5yZXNpemUtcycsIC8vIFJlc2l6ZSBpZiBwb2ludGVyIHRhcmdldCBtYXRjaGVzIHNlbGVjdG9yXG4gICAgcmlnaHQgOiBoYW5kbGVFbCwgICAgLy8gUmVzaXplIGlmIHBvaW50ZXIgdGFyZ2V0IGlzIHRoZSBnaXZlbiBFbGVtZW50XG4gIH0sXG59KVxuXG4vLyByZXNpemUgaW52ZXJ0XG5pbnRlcmFjdCh0YXJnZXQpLnJlc2l6YWJsZSh7XG4gIGVkZ2VzOiB7IGJvdHRvbTogdHJ1ZSwgcmlnaHQ6IHRydWUgfSxcbiAgaW52ZXJ0OiAncmVwb3NpdGlvbicsXG59KVxuXG4vLyByZXNpemUgc3F1YXJlXG5pbnRlcmFjdCh0YXJnZXQpLnJlc2l6YWJsZSh7XG4gIHNxdWFyZVJlc2l6ZTogdHJ1ZSxcbn0pXG5cbi8vIGRyb3B6b25lICBhY2NlcHRcbmludGVyYWN0KHRhcmdldCkuZHJvcHpvbmUoe1xuICBhY2NlcHQ6ICcuZHJhZzAsIC5kcmFnMScsXG59KVxuXG4vLyBkcm9wem9uZSBvdmVybGFwXG5pbnRlcmFjdCh0YXJnZXQpLmRyb3B6b25lKHtcbiAgb3ZlcmxhcDogMC4yNSxcbn0pXG5cbi8vIGRyb3B6b25lIGNoZWNrZXJcbmludGVyYWN0KHRhcmdldCkuZHJvcHpvbmUoe1xuICBjaGVja2VyIChcbiAgICBfZHJhZ0V2ZW50OiBFbGVtZW50LCAgICAgICAgICAvLyByZWxhdGVkIGRyYWdtb3ZlIG9yIGRyYWdlbmRcbiAgICBfZXZlbnQ6IEV2ZW50LCAgICAgICAgICAgICAgICAvLyBUb3VjaCwgUG9pbnRlciBvciBNb3VzZSBFdmVudFxuICAgIGRyb3BwZWQ6IGJvb2xlYW4sICAgICAgICAgICAgIC8vIGJvb2wgZGVmYXVsdCBjaGVja2VyIHJlc3VsdFxuICAgIF9kcm9wem9uZTogSW50ZXJhY3QuSW50ZXJhY3RhYmxlLCAgICAgIC8vIGRyb3B6b25lIEludGVyYWN0YWJsZVxuICAgIGRyb3BFbGVtZW50OiBFbGVtZW50LCAgICAgICAgIC8vIGRyb3B6b25lIGVsZW1udFxuICAgIF9kcmFnZ2FibGU6IEludGVyYWN0LkludGVyYWN0YWJsZSwgICAgIC8vIGRyYWdnYWJsZSBJbnRlcmFjdGFibGVcbiAgICBfZHJhZ2dhYmxlRWxlbWVudDogRWxlbWVudCkgeyAvLyBkcmFnZ2FibGUgZWxlbWVudFxuICAgIC8vIG9ubHkgYWxsb3cgZHJvcHMgaW50byBlbXB0eSBkcm9wem9uZSBlbGVtZW50c1xuICAgIHJldHVybiBkcm9wcGVkICYmICFkcm9wRWxlbWVudC5oYXNDaGlsZE5vZGVzKClcbiAgfSxcbn0pXG5cbmludGVyYWN0LmR5bmFtaWNEcm9wKClcbmludGVyYWN0LmR5bmFtaWNEcm9wKGZhbHNlKVxuXG4vLyBFdmVudHNcbmZ1bmN0aW9uIGxpc3RlbmVyIChldmVudCkge1xuICBjb25zdCB7IHR5cGUsIHBhZ2VYLCBwYWdlWSB9ID0gZXZlbnRcbiAgYWxlcnQoeyB0eXBlLCBwYWdlWCwgcGFnZVkgfSlcbn1cblxuaW50ZXJhY3QodGFyZ2V0KVxuICAub24oJ2RyYWdzdGFydCcsIGxpc3RlbmVyKVxuICAub24oJ2RyYWdtb3ZlIGRyYWdlbmQnLCBsaXN0ZW5lcilcbiAgLm9uKFsncmVzaXplbW92ZScsICdyZXNpemVlbmQnXSwgbGlzdGVuZXIpXG4gIC5vbih7XG4gICAgZ2VzdHVyZXN0YXJ0OiBsaXN0ZW5lcixcbiAgICBnZXN0dXJlZW5kOiBsaXN0ZW5lcixcbiAgfSlcblxuaW50ZXJhY3Qub24oJ3Jlc2l6ZScsIChldmVudDogSW50ZXJhY3QuUmVzaXplRXZlbnQpID0+IHtcbiAgY29uc3QgeyByZWN0LCBkZWx0YVJlY3QgfSA9IGV2ZW50XG4gIGFsZXJ0KEpTT04uc3RyaW5naWZ5KHsgcmVjdCwgZGVsdGFSZWN0IH0pKVxufSlcblxuaW50ZXJhY3QodGFyZ2V0KS5yZXNpemFibGUoe1xuICBsaXN0ZW5lcnM6IFtcbiAgICB7IHN0YXJ0OiBsaXN0ZW5lciwgbW92ZTogbGlzdGVuZXIgfSxcbiAgXSxcbn0pXG5cbmludGVyYWN0KHRhcmdldCkuZHJhZ2dhYmxlKHtcbiAgbGlzdGVuZXJzOiB7IHN0YXJ0OiBsaXN0ZW5lciwgZW5kOiBsaXN0ZW5lciB9LFxufSlcblxuaW50ZXJhY3QodGFyZ2V0KS5kcmFnZ2FibGUoe1xuICBvbnN0YXJ0OiBsaXN0ZW5lcixcbiAgb25tb3ZlOiBsaXN0ZW5lcixcbiAgb25lbmQ6IGxpc3RlbmVyLFxufSlcblxuaW50ZXJhY3Qub24oWydkcmFnbW92ZScsICdyZXNpemVzdGFydCddLCBsaXN0ZW5lcilcblxuY29uc3QgZHJvcFRhcmdldCA9ICdkaXYnXG4vLyBEcm9wIEV2ZW50c1xuaW50ZXJhY3QoZHJvcFRhcmdldClcbiAgLmRyb3B6b25lKHtcbiAgICBvbmRyb3AgKGV2ZW50KSB7XG4gICAgICBhbGVydChldmVudC5yZWxhdGVkVGFyZ2V0LmlkICtcbiAgICAgICAgICAgICcgd2FzIGRyb3BwZWQgaW50byAnICtcbiAgICAgICAgICAgIGV2ZW50LnRhcmdldC5pZClcbiAgICB9LFxuICB9KVxuICAub24oJ2Ryb3BhY3RpdmF0ZScsIChldmVudCkgPT4ge1xuICAgIGV2ZW50LnRhcmdldC5jbGFzc0xpc3QuYWRkKCdkcm9wLWFjdGl2YXRlZCcpXG4gIH0pXG5cbmludGVyYWN0KHRhcmdldCkub24oJ3VwJywgKF9ldmVudCkgPT4ge30pXG5cbi8vIGZhc3QgY2xpY2tcbmludGVyYWN0KCdhW2hyZWZdJykub24oJ3RhcCcsIChldmVudCkgPT4ge1xuICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IGV2ZW50LmN1cnJlbnRUYXJnZXQuaHJlZlxuXG4gIGV2ZW50LnByZXZlbnREZWZhdWx0KClcbn0pXG4iXX0=