import { IonicNativePlugin } from '@ionic-native/core';
/**
 * @name Firebase Crashlytics
 * @description
 * A Google Firebase Crashlytics plugin to enable capture of crash reports.
 *
 * @usage
 * ```typescript
 * import { FirebaseCrashlytics } from '@ionic-native/firebase-crashlytics/ngx';
 *
 *
 * constructor(private firebaseCrashlytics: FirebaseCrashlytics) { }
 *
 * ...
 *
 *
 * const crashlytics = this.firebaseCrashlytics.initialize();
 * crashlytics.logException('my caught exception');
 *
 * ```
 */
export declare class FirebaseCrashlytics extends IonicNativePlugin {
    /**
     * Simply add the plugin to get the default Crashlytics functionality. Note that crashes and logged exceptions will only be reported when the application restarts. In order to log caught exceptions the following can be used:
     *
     * @returns {void}
     */
    initialise(): any;
    /**
     * Generate a forced crash. Visible in console after restart of application.
     *
     * @returns {void}
     */
    crash(): void;
    /**
     * Log a priority message. Will only be logged in the event of a crash.
     *
     * @param {number} priority
     * @param {string} tag
     * @param {string} message
     * @returns {void}
     */
    logPriority(priority: number, tag: string, message: string): void;
    /**
     * Log a message. Will only be logged in the event of a crash.
     *
     * @param {string} message
     * @returns {void}
     */
    log(message: string): void;
    /**
     * Log when a handled exception has happened. Visible in console after restart of application.
     *
     * @param {string} message
     * @returns {void}
     */
    logException(message: string): void;
    /**
     * Set extra key/value string value. Will only be logged in the event of a crash.
     *
     * @param {string} key
     * @param {string} value
     * @returns {void}
     */
    setString(key: string, value: string): void;
    /**
     * Set extra key/value bool value. Will only be logged in the event of a crash.
     *
     * @param {string} key
     * @param {boolean} value
     * @returns {void}
     */
    setBool(key: string, value: boolean): void;
    /**
     * Set extra key/value double value. Will only be logged in the event of a crash.
     *
     * @param {string} key
     * @param {number} value
     * @returns {void}
     */
    setDouble(key: string, value: number): void;
    /**
     * Set extra key/value float value. Will only be logged in the event of a crash.
     *
     * @param {string} key
     * @param {number} value
     * @returns {void}
     */
    setFloat(key: string, value: number): void;
    /**
     * Set extra key/value integer value. Will only be logged in the event of a crash.
     *
     * @param {string} key
     * @param {number} value
     * @returns {void}
     */
    setInt(key: string, value: number): void;
    /**
     * Set the identifier for the user. Take care when using this method and ensure you privacy policy is updated accordingly.
     *
     * @param {string} identifier
     * @returns {void}
     */
    setUserIdentifier(identifier: string): void;
}
