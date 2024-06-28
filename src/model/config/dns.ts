import { StringMap } from '../map';

/**
 * Defines DNS data.
 */
export interface DnsData {
  readonly zone: StringMap<ZoneContainer>;
}

/**
 * Defines a DNS zone container.
 */
export interface ZoneContainer {
  readonly data: ZoneData;
  readonly entry: StringMap<EntryData>;
}

/**
 * Defines the data of a DNS zone.
 */
export interface ZoneData {
  readonly baseDomain: string;
  readonly project?: string;
}

/**
 * Defines the data of a DNS entry.
 */
export interface EntryData {
  readonly type: string;
  readonly ttl?: number;
  readonly values: readonly string[];
  readonly domains: readonly string[];
}
