var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { IonicNativePlugin, cordova } from '@ionic-native/core';
var InstagramOriginal = /** @class */ (function (_super) {
    __extends(InstagramOriginal, _super);
    function InstagramOriginal() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    InstagramOriginal.prototype.isInstalled = function () { return cordova(this, "isInstalled", { "callbackStyle": "node" }, arguments); };
    InstagramOriginal.prototype.share = function (canvasIdOrDataUrl, caption) { return cordova(this, "share", { "callbackStyle": "node" }, arguments); };
    InstagramOriginal.prototype.shareAsset = function (assetLocalIdentifier) { return cordova(this, "shareAsset", { "callbackOrder": "reverse" }, arguments); };
    InstagramOriginal.pluginName = "Instagram";
    InstagramOriginal.plugin = "cordova-instagram-plugin";
    InstagramOriginal.pluginRef = "Instagram";
    InstagramOriginal.repo = "https://github.com/vstirbu/InstagramPlugin";
    InstagramOriginal.platforms = ["Android", "iOS"];
    return InstagramOriginal;
}(IonicNativePlugin));
var Instagram = new InstagramOriginal();
export { Instagram };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvQGlvbmljLW5hdGl2ZS9wbHVnaW5zL2luc3RhZ3JhbS9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQ0EsT0FBTyw4QkFBc0MsTUFBTSxvQkFBb0IsQ0FBQzs7SUE0QnpDLDZCQUFpQjs7OztJQVU5QywrQkFBVztJQWVYLHlCQUFLLGFBQUMsaUJBQXlCLEVBQUUsT0FBZ0I7SUFZakQsOEJBQVUsYUFBQyxvQkFBNEI7Ozs7OztvQkFsRXpDO0VBNkIrQixpQkFBaUI7U0FBbkMsU0FBUyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvcmRvdmEsIElvbmljTmF0aXZlUGx1Z2luLCBQbHVnaW4gfSBmcm9tICdAaW9uaWMtbmF0aXZlL2NvcmUnO1xuXG4vKipcbiAqIEBuYW1lIEluc3RhZ3JhbVxuICogQGRlc2NyaXB0aW9uIFNoYXJlIGEgcGhvdG8gd2l0aCB0aGUgaW5zdGFncmFtIGFwcFxuICpcbiAqIEB1c2FnZVxuICogYGBgdHlwZXNjcmlwdFxuICogaW1wb3J0IHsgSW5zdGFncmFtIH0gZnJvbSAnQGlvbmljLW5hdGl2ZS9pbnN0YWdyYW0vbmd4JztcbiAqXG4gKiBjb25zdHJ1Y3Rvcihwcml2YXRlIGluc3RhZ3JhbTogSW5zdGFncmFtKSB7IH1cbiAqXG4gKiAuLi5cbiAqXG4gKiB0aGlzLmluc3RhZ3JhbS5zaGFyZSgnZGF0YTppbWFnZS9wbmc7dWhkdWhmM2hmaWYzMycsICdDYXB0aW9uJylcbiAqICAgLnRoZW4oKCkgPT4gY29uc29sZS5sb2coJ1NoYXJlZCEnKSlcbiAqICAgLmNhdGNoKChlcnJvcjogYW55KSA9PiBjb25zb2xlLmVycm9yKGVycm9yKSk7XG4gKlxuICogYGBgXG4gKi9cbkBQbHVnaW4oe1xuICBwbHVnaW5OYW1lOiAnSW5zdGFncmFtJyxcbiAgcGx1Z2luOiAnY29yZG92YS1pbnN0YWdyYW0tcGx1Z2luJyxcbiAgcGx1Z2luUmVmOiAnSW5zdGFncmFtJyxcbiAgcmVwbzogJ2h0dHBzOi8vZ2l0aHViLmNvbS92c3RpcmJ1L0luc3RhZ3JhbVBsdWdpbicsXG4gIHBsYXRmb3JtczogWydBbmRyb2lkJywgJ2lPUyddXG59KVxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEluc3RhZ3JhbSBleHRlbmRzIElvbmljTmF0aXZlUGx1Z2luIHtcblxuICAvKipcbiAgICogRGV0ZWN0IGlmIHRoZSBJbnN0YWdyYW0gYXBwbGljYXRpb24gaXMgaW5zdGFsbGVkIG9uIHRoZSBkZXZpY2UuXG4gICAqXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPGJvb2xlYW58c3RyaW5nPn0gUmV0dXJucyBhIHByb21pc2UgdGhhdCByZXR1cm5zIGEgYm9vbGVhbiB2YWx1ZSBpZiBpbnN0YWxsZWQsIG9yIHRoZSBhcHAgdmVyc2lvbiBvbiBhbmRyb2lkXG4gICAqL1xuICBAQ29yZG92YSh7XG4gICAgY2FsbGJhY2tTdHlsZTogJ25vZGUnXG4gIH0pXG4gIGlzSW5zdGFsbGVkKCk6IFByb21pc2U8Ym9vbGVhbiB8IHN0cmluZz4ge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIC8qKlxuICAgKiBTaGFyZSBhbiBpbWFnZSBvbiBJbnN0YWdyYW1cbiAgICogTm90ZTogSW5zdGFncmFtIGFwcCBzdG9wcGVkIGFjY2VwdGluZyBwcmUtZmlsbGVkIGNhcHRpb25zIG9uIGJvdGggaU9TIGFuZCBBbmRyb2lkLiBBcyBhIHdvcmstYXJvdW5kLCB0aGUgY2FwdGlvbiBpcyBjb3BpZWQgdG8gdGhlIGNsaXBib2FyZC4gWW91IGhhdmUgdG8gaW5mb3JtIHlvdXIgdXNlcnMgdG8gcGFzdGUgdGhlIGNhcHRpb24uXG4gICAqXG4gICAqIEBwYXJhbSBjYW52YXNJZE9yRGF0YVVybCBUaGUgY2FudmFzIGVsZW1lbnQgaWQgb3IgdGhlIGRhdGFVUkwgb2YgdGhlIGltYWdlIHRvIHNoYXJlXG4gICAqIEBwYXJhbSBjYXB0aW9uIFRoZSBjYXB0aW9uIG9mIHRoZSBpbWFnZVxuICAgKiBAcmV0dXJucyB7UHJvbWlzZTxhbnk+fSBSZXR1cm5zIGEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIGlmIHRoZSBpbWFnZSB3YXMgc2hhcmVkXG4gICAqL1xuICBAQ29yZG92YSh7XG4gICAgY2FsbGJhY2tTdHlsZTogJ25vZGUnXG4gIH0pXG4gIHNoYXJlKGNhbnZhc0lkT3JEYXRhVXJsOiBzdHJpbmcsIGNhcHRpb24/OiBzdHJpbmcpOiBQcm9taXNlPGFueT4ge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIC8qKlxuICAgKiBTaGFyZSBhIGxpYnJhcnkgYXNzZXQgb3IgdmlkZW9cbiAgICogQHBhcmFtIGFzc2V0TG9jYWxJZGVudGlmaWVyIEEgbG9jYWwgZmlsZVVSSVxuICAgKiBAcmV0dXJucyB7UHJvbWlzZTxhbnk+fSBSZXR1cm5zIGEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIGlmIHRoZSBpbWFnZSB3YXMgc2hhcmVkXG4gICAqL1xuICBAQ29yZG92YSh7XG4gICAgY2FsbGJhY2tPcmRlcjogJ3JldmVyc2UnXG4gIH0pXG4gIHNoYXJlQXNzZXQoYXNzZXRMb2NhbElkZW50aWZpZXI6IHN0cmluZyk6IFByb21pc2U8YW55PiB7XG4gICAgcmV0dXJuO1xuICB9XG5cbn1cbiJdfQ==