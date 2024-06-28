import { Config, getStack } from '@pulumi/pulumi';

import { DnsData } from '../model/config/dns';

export const environment = getStack();

const config = new Config();
export const dnsConfig = config.requireObject<DnsData>('dns');

export const commonLabels = {
  environment: environment,
};
