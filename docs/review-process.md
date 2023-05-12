# Review Process via GitHub

The key words “MUST”, “MUST NOT”, “REQUIRED”, “SHALL”, “SHALL NOT”, “SHOULD”, “SHOULD NOT”, “RECOMMENDED”, “MAY”, and “OPTIONAL” in this document are to be interpreted as described in [RFC 2119](https://www.ietf.org/rfc/rfc2119.txt).


## Branching

* Naming of branches MUST start with `m-` if forked from `main`
* Naming of branches MUST confirm to format `<type>-<description>` following conventional commits[^cc]

## Commits

* Message of commits on the main branch SHOULD confirm to conventional commits[^cc].
* Commits on a forked branch MAY not confirm to conventional commit if the branch is squashed to the `main` branch

## Review Process

* Each pull request to the `main` branch MUST be reviewed by at least one person
  * The person reviewing MUST NOT be the author of the pull request 
  * The person reviewing SHOULD NOT be author of any new commits to be merged
* The title of the pull request MUST confirm to conventional commits[^cc].
* The description of the pull request MAY include detailed description of changes and their implications
* The reviewer MUST approve the changes or request changes to the code base
  * The author MAY implement the requested changes
* The author MUST **merge** or **squash** the requested changes to the specified branch


[^cc]: https://www.conventionalcommits.org/en/v1.0.0/