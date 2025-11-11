/**
 * StorageManager
 *
 * A generic manager for storing and retrieving JSON-serializable
 * data in LocalStorage, with optional in-memory fallback.
 */

export class StorageManager {
  /**
   * Get singleton instance for a given namespace
   * @param keyPrefix - unique namespace key
   */
  private static instances: Map<string, StorageManager> = new Map();
  private cache: Record<string, any> = {};
  private keyPrefix: string;

  constructor(keyPrefix: string) {
    this.keyPrefix = keyPrefix;
    this.load();
  }

  static getInstance(keyPrefix: string): StorageManager {
    if (!this.instances.has(keyPrefix)) {
      this.instances.set(keyPrefix, new StorageManager(keyPrefix));
    }
    return this.instances.get(keyPrefix)!;
  }

  /**
   * Save a value under a key
   * @param key - key to store value
   * @param value - any JSON-serializable value
   */
  set<T>(key: string, value: T): void {
    this.cache[key] = value;
    this.save();
  }

  /**
   * Get the full data object
   */
  getAll(): Record<string, any> {
    return { ...this.cache };
  }

  /**
   * Remove a key from storage
   */
  remove(key: string): void {
    delete this.cache[key];
    this.save();
  }

  /**
   * Get all keys stored in this namespace
   */
  keys(): string[] {
    return Object.keys(this.cache);
  }

  /**
   * Clear all data in this namespace
   */
  clear(): void {
    this.cache = {};
    this.save();
  }

  /**
   * Retrieve a value by key, optionally with a default
   * @param key - key to retrieve
   * @param defaultValue - value if key not found
   */
  get<T>(key: string, defaultValue?: T): T | undefined {
    if (key in this.cache) return this.cache[key];

    if (defaultValue) {
      return defaultValue;
    }
    return undefined;
  }

  /**
   * Save data to localStorage
   */
  private save(): void {
    try {
      localStorage.setItem(this.keyPrefix, JSON.stringify(this.cache));
    } catch (err) {
      console.warn(
        `[StorageManager:${this.keyPrefix}] Failed to save to LocalStorage`,
        err
      );
    }
  }

  /**
   * Load data from localStorage
   */
  private load(): void {
    try {
      const raw = localStorage.getItem(this.keyPrefix);
      if (raw) {
        this.cache = JSON.parse(raw);
      }
    } catch (err) {
      console.warn(
        `[StorageManager:${this.keyPrefix}] Failed to load from LocalStorage`,
        err
      );
      this.cache = {};
    }
  }
}
