import interact, { init as initInteract } from '@interactjs/interact';
import * as modifiers from '@interactjs/modifiers';
import '@interactjs/types';
import extend from '@interactjs/utils/extend';
import * as snappers from '@interactjs/utils/snappers';
if (typeof window === 'object' && !!window) {
    init(window);
}
export function init(win) {
    initInteract(win);
    return interact.use({
        id: 'interactjs',
        install() {
            interact.modifiers = extend({}, modifiers);
            interact.snappers = snappers;
            interact.createSnapGrid = interact.snappers.grid;
        },
    });
}
export default interact;
interact['default'] = interact; // tslint:disable-line no-string-literal
interact['init'] = init; // tslint:disable-line no-string-literal
if (typeof module === 'object' && !!module) {
    module.exports = interact;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFFBQVEsRUFBRSxFQUFFLElBQUksSUFBSSxZQUFZLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQTtBQUNyRSxPQUFPLEtBQUssU0FBUyxNQUFNLHVCQUF1QixDQUFBO0FBRWxELE9BQU8sbUJBQW1CLENBQUE7QUFDMUIsT0FBTyxNQUFNLE1BQU0sMEJBQTBCLENBQUE7QUFDN0MsT0FBTyxLQUFLLFFBQVEsTUFBTSw0QkFBNEIsQ0FBQTtBQVV0RCxJQUFJLE9BQU8sTUFBTSxLQUFLLFFBQVEsSUFBSSxDQUFDLENBQUMsTUFBTSxFQUFFO0lBQzFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQTtDQUNiO0FBRUQsTUFBTSxVQUFVLElBQUksQ0FBRSxHQUFXO0lBQy9CLFlBQVksQ0FBQyxHQUFHLENBQUMsQ0FBQTtJQUVqQixPQUFPLFFBQVEsQ0FBQyxHQUFHLENBQUM7UUFDbEIsRUFBRSxFQUFFLFlBQVk7UUFDaEIsT0FBTztZQUNMLFFBQVEsQ0FBQyxTQUFTLEdBQUcsTUFBTSxDQUFDLEVBQUUsRUFBRSxTQUFTLENBQUMsQ0FBQTtZQUMxQyxRQUFRLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQTtZQUM1QixRQUFRLENBQUMsY0FBYyxHQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFBO1FBQ2xELENBQUM7S0FDRixDQUFDLENBQUE7QUFDSixDQUFDO0FBRUQsZUFBZSxRQUFRLENBQUE7QUFDdkIsUUFBUSxDQUFDLFNBQVMsQ0FBQyxHQUFHLFFBQVEsQ0FBQSxDQUFDLHdDQUF3QztBQUN2RSxRQUFRLENBQUMsTUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFBLENBQUMsd0NBQXdDO0FBRWhFLElBQUksT0FBTyxNQUFNLEtBQUssUUFBUSxJQUFJLENBQUMsQ0FBQyxNQUFNLEVBQUU7SUFDMUMsTUFBTSxDQUFDLE9BQU8sR0FBRyxRQUFRLENBQUE7Q0FDMUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgaW50ZXJhY3QsIHsgaW5pdCBhcyBpbml0SW50ZXJhY3QgfSBmcm9tICdAaW50ZXJhY3Rqcy9pbnRlcmFjdCdcbmltcG9ydCAqIGFzIG1vZGlmaWVycyBmcm9tICdAaW50ZXJhY3Rqcy9tb2RpZmllcnMnXG5pbXBvcnQgeyBNb2RpZmllciB9IGZyb20gJ0BpbnRlcmFjdGpzL21vZGlmaWVycy9iYXNlJ1xuaW1wb3J0ICdAaW50ZXJhY3Rqcy90eXBlcydcbmltcG9ydCBleHRlbmQgZnJvbSAnQGludGVyYWN0anMvdXRpbHMvZXh0ZW5kJ1xuaW1wb3J0ICogYXMgc25hcHBlcnMgZnJvbSAnQGludGVyYWN0anMvdXRpbHMvc25hcHBlcnMnXG5cbmRlY2xhcmUgbW9kdWxlICdAaW50ZXJhY3Rqcy9pbnRlcmFjdC9pbnRlcmFjdCcge1xuICAgIGludGVyZmFjZSBJbnRlcmFjdFN0YXRpYyB7XG4gICAgICAgIG1vZGlmaWVycz86IHR5cGVvZiBtb2RpZmllcnMgJiB7IFtrZXk6IHN0cmluZ106IChvcHRpb25zPykgPT4gTW9kaWZpZXIgfVxuICAgICAgICBzbmFwcGVycz86IHR5cGVvZiBzbmFwcGVycyAmIHsgW2tleTogc3RyaW5nXTogYW55IH1cbiAgICAgICAgY3JlYXRlU25hcEdyaWQ/OiB0eXBlb2Ygc25hcHBlcnMuZ3JpZFxuICAgIH1cbn1cblxuaWYgKHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnICYmICEhd2luZG93KSB7XG4gIGluaXQod2luZG93KVxufVxuXG5leHBvcnQgZnVuY3Rpb24gaW5pdCAod2luOiBXaW5kb3cpIHtcbiAgaW5pdEludGVyYWN0KHdpbilcblxuICByZXR1cm4gaW50ZXJhY3QudXNlKHtcbiAgICBpZDogJ2ludGVyYWN0anMnLFxuICAgIGluc3RhbGwgKCkge1xuICAgICAgaW50ZXJhY3QubW9kaWZpZXJzID0gZXh0ZW5kKHt9LCBtb2RpZmllcnMpXG4gICAgICBpbnRlcmFjdC5zbmFwcGVycyA9IHNuYXBwZXJzXG4gICAgICBpbnRlcmFjdC5jcmVhdGVTbmFwR3JpZCA9IGludGVyYWN0LnNuYXBwZXJzLmdyaWRcbiAgICB9LFxuICB9KVxufVxuXG5leHBvcnQgZGVmYXVsdCBpbnRlcmFjdFxuaW50ZXJhY3RbJ2RlZmF1bHQnXSA9IGludGVyYWN0IC8vIHRzbGludDpkaXNhYmxlLWxpbmUgbm8tc3RyaW5nLWxpdGVyYWxcbmludGVyYWN0Wydpbml0J10gPSBpbml0IC8vIHRzbGludDpkaXNhYmxlLWxpbmUgbm8tc3RyaW5nLWxpdGVyYWxcblxuaWYgKHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnICYmICEhbW9kdWxlKSB7XG4gIG1vZHVsZS5leHBvcnRzID0gaW50ZXJhY3Rcbn1cbiJdfQ==