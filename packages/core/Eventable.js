import * as arr from '@interactjs/utils/arr';
import extend from '@interactjs/utils/extend';
import normalize from '@interactjs/utils/normalizeListeners';
function fireUntilImmediateStopped(event, listeners) {
    for (const listener of listeners) {
        if (event.immediatePropagationStopped) {
            break;
        }
        listener(event);
    }
}
class Eventable {
    constructor(options) {
        this.types = {};
        this.propagationStopped = false;
        this.immediatePropagationStopped = false;
        this.options = extend({}, options || {});
    }
    fire(event) {
        let listeners;
        const global = this.global;
        // Interactable#on() listeners
        // tslint:disable no-conditional-assignment
        if ((listeners = this.types[event.type])) {
            fireUntilImmediateStopped(event, listeners);
        }
        // interact.on() listeners
        if (!event.propagationStopped && global && (listeners = global[event.type])) {
            fireUntilImmediateStopped(event, listeners);
        }
    }
    on(type, listener) {
        const listeners = normalize(type, listener);
        for (type in listeners) {
            this.types[type] = arr.merge(this.types[type] || [], listeners[type]);
        }
    }
    off(type, listener) {
        const listeners = normalize(type, listener);
        for (type in listeners) {
            const eventList = this.types[type];
            if (!eventList || !eventList.length) {
                continue;
            }
            for (const subListener of listeners[type]) {
                const index = eventList.indexOf(subListener);
                if (index !== -1) {
                    eventList.splice(index, 1);
                }
            }
        }
    }
    getRect(_element) {
        return null;
    }
}
export default Eventable;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRXZlbnRhYmxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiRXZlbnRhYmxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sS0FBSyxHQUFHLE1BQU0sdUJBQXVCLENBQUE7QUFDNUMsT0FBTyxNQUFNLE1BQU0sMEJBQTBCLENBQUE7QUFDN0MsT0FBTyxTQUFrQyxNQUFNLHNDQUFzQyxDQUFBO0FBSXJGLFNBQVMseUJBQXlCLENBRy9CLEtBQTBCLEVBQUUsU0FBOEI7SUFDM0QsS0FBSyxNQUFNLFFBQVEsSUFBSSxTQUFTLEVBQUU7UUFDaEMsSUFBSSxLQUFLLENBQUMsMkJBQTJCLEVBQUU7WUFBRSxNQUFLO1NBQUU7UUFFaEQsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFBO0tBQ2hCO0FBQ0gsQ0FBQztBQUVELE1BQU0sU0FBUztJQU9iLFlBQWEsT0FBa0M7UUFML0MsVUFBSyxHQUF3QixFQUFFLENBQUE7UUFDL0IsdUJBQWtCLEdBQUcsS0FBSyxDQUFBO1FBQzFCLGdDQUEyQixHQUFHLEtBQUssQ0FBQTtRQUlqQyxJQUFJLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQyxFQUFFLEVBQUUsT0FBTyxJQUFJLEVBQUUsQ0FBQyxDQUFBO0lBQzFDLENBQUM7SUFFRCxJQUFJLENBQUUsS0FBVTtRQUNkLElBQUksU0FBUyxDQUFBO1FBQ2IsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQTtRQUUxQiw4QkFBOEI7UUFDOUIsMkNBQTJDO1FBQzNDLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRTtZQUN4Qyx5QkFBeUIsQ0FBQyxLQUFLLEVBQUUsU0FBUyxDQUFDLENBQUE7U0FDNUM7UUFFRCwwQkFBMEI7UUFDMUIsSUFBSSxDQUFDLEtBQUssQ0FBQyxrQkFBa0IsSUFBSSxNQUFNLElBQUksQ0FBQyxTQUFTLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFHO1lBQzVFLHlCQUF5QixDQUFDLEtBQUssRUFBRSxTQUFTLENBQUMsQ0FBQTtTQUM1QztJQUNILENBQUM7SUFFRCxFQUFFLENBQUUsSUFBWSxFQUFFLFFBQStCO1FBQy9DLE1BQU0sU0FBUyxHQUFHLFNBQVMsQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUE7UUFFM0MsS0FBSyxJQUFJLElBQUksU0FBUyxFQUFFO1lBQ3RCLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsRUFBRSxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQTtTQUN0RTtJQUNILENBQUM7SUFFRCxHQUFHLENBQUUsSUFBWSxFQUFFLFFBQStCO1FBQ2hELE1BQU0sU0FBUyxHQUFHLFNBQVMsQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUE7UUFFM0MsS0FBSyxJQUFJLElBQUksU0FBUyxFQUFFO1lBQ3RCLE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUE7WUFFbEMsSUFBSSxDQUFDLFNBQVMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUU7Z0JBQUUsU0FBUTthQUFFO1lBRWpELEtBQUssTUFBTSxXQUFXLElBQUksU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFFO2dCQUN6QyxNQUFNLEtBQUssR0FBRyxTQUFTLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFBO2dCQUU1QyxJQUFJLEtBQUssS0FBSyxDQUFDLENBQUMsRUFBRTtvQkFDaEIsU0FBUyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUE7aUJBQzNCO2FBQ0Y7U0FDRjtJQUNILENBQUM7SUFFRCxPQUFPLENBQUUsUUFBMEI7UUFDakMsT0FBTyxJQUFJLENBQUE7SUFDYixDQUFDO0NBQ0Y7QUFFRCxlQUFlLFNBQVMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIGFyciBmcm9tICdAaW50ZXJhY3Rqcy91dGlscy9hcnInXG5pbXBvcnQgZXh0ZW5kIGZyb20gJ0BpbnRlcmFjdGpzL3V0aWxzL2V4dGVuZCdcbmltcG9ydCBub3JtYWxpemUsIHsgTm9ybWFsaXplZExpc3RlbmVycyB9IGZyb20gJ0BpbnRlcmFjdGpzL3V0aWxzL25vcm1hbGl6ZUxpc3RlbmVycydcbmltcG9ydCB7IEV2ZW50UGhhc2UsIEludGVyYWN0RXZlbnQgfSBmcm9tICcuL0ludGVyYWN0RXZlbnQnXG5pbXBvcnQgeyBBY3Rpb25OYW1lIH0gZnJvbSAnLi9zY29wZSdcblxuZnVuY3Rpb24gZmlyZVVudGlsSW1tZWRpYXRlU3RvcHBlZDxcbiAgVCBleHRlbmRzIEFjdGlvbk5hbWUsXG4gIFAgZXh0ZW5kcyBFdmVudFBoYXNlLFxuPiAoZXZlbnQ6IEludGVyYWN0RXZlbnQ8VCwgUD4sIGxpc3RlbmVyczogSW50ZXJhY3QuTGlzdGVuZXJbXSkge1xuICBmb3IgKGNvbnN0IGxpc3RlbmVyIG9mIGxpc3RlbmVycykge1xuICAgIGlmIChldmVudC5pbW1lZGlhdGVQcm9wYWdhdGlvblN0b3BwZWQpIHsgYnJlYWsgfVxuXG4gICAgbGlzdGVuZXIoZXZlbnQpXG4gIH1cbn1cblxuY2xhc3MgRXZlbnRhYmxlIHtcbiAgb3B0aW9uczogYW55XG4gIHR5cGVzOiBOb3JtYWxpemVkTGlzdGVuZXJzID0ge31cbiAgcHJvcGFnYXRpb25TdG9wcGVkID0gZmFsc2VcbiAgaW1tZWRpYXRlUHJvcGFnYXRpb25TdG9wcGVkID0gZmFsc2VcbiAgZ2xvYmFsOiBhbnlcblxuICBjb25zdHJ1Y3RvciAob3B0aW9ucz86IHsgW2luZGV4OiBzdHJpbmddOiBhbnkgfSkge1xuICAgIHRoaXMub3B0aW9ucyA9IGV4dGVuZCh7fSwgb3B0aW9ucyB8fCB7fSlcbiAgfVxuXG4gIGZpcmUgKGV2ZW50OiBhbnkpIHtcbiAgICBsZXQgbGlzdGVuZXJzXG4gICAgY29uc3QgZ2xvYmFsID0gdGhpcy5nbG9iYWxcblxuICAgIC8vIEludGVyYWN0YWJsZSNvbigpIGxpc3RlbmVyc1xuICAgIC8vIHRzbGludDpkaXNhYmxlIG5vLWNvbmRpdGlvbmFsLWFzc2lnbm1lbnRcbiAgICBpZiAoKGxpc3RlbmVycyA9IHRoaXMudHlwZXNbZXZlbnQudHlwZV0pKSB7XG4gICAgICBmaXJlVW50aWxJbW1lZGlhdGVTdG9wcGVkKGV2ZW50LCBsaXN0ZW5lcnMpXG4gICAgfVxuXG4gICAgLy8gaW50ZXJhY3Qub24oKSBsaXN0ZW5lcnNcbiAgICBpZiAoIWV2ZW50LnByb3BhZ2F0aW9uU3RvcHBlZCAmJiBnbG9iYWwgJiYgKGxpc3RlbmVycyA9IGdsb2JhbFtldmVudC50eXBlXSkpICB7XG4gICAgICBmaXJlVW50aWxJbW1lZGlhdGVTdG9wcGVkKGV2ZW50LCBsaXN0ZW5lcnMpXG4gICAgfVxuICB9XG5cbiAgb24gKHR5cGU6IHN0cmluZywgbGlzdGVuZXI6IEludGVyYWN0Lkxpc3RlbmVyc0FyZykge1xuICAgIGNvbnN0IGxpc3RlbmVycyA9IG5vcm1hbGl6ZSh0eXBlLCBsaXN0ZW5lcilcblxuICAgIGZvciAodHlwZSBpbiBsaXN0ZW5lcnMpIHtcbiAgICAgIHRoaXMudHlwZXNbdHlwZV0gPSBhcnIubWVyZ2UodGhpcy50eXBlc1t0eXBlXSB8fCBbXSwgbGlzdGVuZXJzW3R5cGVdKVxuICAgIH1cbiAgfVxuXG4gIG9mZiAodHlwZTogc3RyaW5nLCBsaXN0ZW5lcjogSW50ZXJhY3QuTGlzdGVuZXJzQXJnKSB7XG4gICAgY29uc3QgbGlzdGVuZXJzID0gbm9ybWFsaXplKHR5cGUsIGxpc3RlbmVyKVxuXG4gICAgZm9yICh0eXBlIGluIGxpc3RlbmVycykge1xuICAgICAgY29uc3QgZXZlbnRMaXN0ID0gdGhpcy50eXBlc1t0eXBlXVxuXG4gICAgICBpZiAoIWV2ZW50TGlzdCB8fCAhZXZlbnRMaXN0Lmxlbmd0aCkgeyBjb250aW51ZSB9XG5cbiAgICAgIGZvciAoY29uc3Qgc3ViTGlzdGVuZXIgb2YgbGlzdGVuZXJzW3R5cGVdKSB7XG4gICAgICAgIGNvbnN0IGluZGV4ID0gZXZlbnRMaXN0LmluZGV4T2Yoc3ViTGlzdGVuZXIpXG5cbiAgICAgICAgaWYgKGluZGV4ICE9PSAtMSkge1xuICAgICAgICAgIGV2ZW50TGlzdC5zcGxpY2UoaW5kZXgsIDEpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBnZXRSZWN0IChfZWxlbWVudDogSW50ZXJhY3QuRWxlbWVudCkge1xuICAgIHJldHVybiBudWxsXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgRXZlbnRhYmxlXG4iXX0=