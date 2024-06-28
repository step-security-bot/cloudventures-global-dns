# `cloudventures`: Global DNS

[![Build status](https://img.shields.io/github/actions/workflow/status/muhlba91/cloudventures-global-dns/pipeline.yml?style=for-the-badge)](https://github.com/muhlba91/cloudventures-global-dns/actions/workflows/pipeline.yml)
[![License](https://img.shields.io/github/license/muhlba91/cloudventures-global-dns?style=for-the-badge)](LICENSE.md)

This repository contains the Global DNS for the following domains using [Pulumi](http://pulumi.com):

- `cloudventures.cloud`

---

## Requirements

- [NodeJS](https://nodejs.org/en), and [yarn](https://yarnpkg.com)
- [Pulumi](https://www.pulumi.com/docs/install/)

## Creating the Infrastructure

To create the DNS records, a [Pulumi Stack](https://www.pulumi.com/docs/concepts/stack/) with the correct configuration needs to exists.

The stack can be deployed via:

```bash
yarn install
yarn build; pulumi up
```

## Destroying the Infrastructure

The entire infrastructure can be destroyed via:

```bash
yarn install
yarn build; pulumi destroy
```

## Environment Variables

To successfully run, and configure the Pulumi plugins, you need to set a list of environment variables. Alternatively, refer to the used Pulumi provider's configuration documentation.

- `CLOUDSDK_CORE_PROJECT`: the Google Cloud (GCP) project
- `CLOUDSDK_COMPUTE_REGION` the Google Cloud (GCP) region
- `GOOGLE_APPLICATION_CREDENTIALS`: reference to a file containing the Google Cloud (GCP) service account credentials

---

## Configuration

The following section describes the configuration which must be set in the Pulumi Stack.

***Attention:*** do use [Secrets Encryption](https://www.pulumi.com/docs/concepts/secrets/#:~:text=Pulumi%20never%20sends%20authentication%20secrets,“secrets”%20for%20extra%20protection.) provided by Pulumi for secret values!

### DNS

DNS configuration is based on entry specifications.

```yaml
dns:
  zone: the map of DNS zones with records‚
    <NAME>:
      data:
        baseDomain: the base domain of the zone
        project: the Google Cloud project where the zone is hosted (optional)
      entry: a map of DNS entries for this zone
        <NAME>:
          type: the DNS type (e.g. A, TXT, MX, ...)
          ttl: the TTL to set (optional)
          values: a list of values to set for this entry
          domains: a list of domains to set this entry for
```

---

## Continuous Integration and Automations

- [GitHub Actions](https://docs.github.com/en/actions) are linting, and verifying the code.
- [Renovate Bot](https://github.com/renovatebot/renovate) is updating NodeJS packages, and GitHub Actions.
