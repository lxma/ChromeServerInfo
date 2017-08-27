# ChromeServerInfo
**Work stopped as certificate information is not accessible to Chrome extensions**

A Chrome extension to display information on the current
server. It shall make transparent
- The true server name (which is _not_ easily deducable from the URL)
- The trusting root certificate
- Change in trusting root certificate (in case there was a change)

As of now (2017-08-26), chrome extensions have no access to certificate
information (which is a shame). This extension still displays the true
server name, but certificate validation won't happen.

Note that other extensions (such as SSL Checker) send the current host to third party sites
for validation. This might be useful for some situations, but
it won't give you the truth about you own current connection (which is the only thing
that matters for a regular user).

Using Firefox instead is an unstable solution as well. Firefox announced (for good reasons)
to abolish their old add-on API and introduced “WebExtensions” as a replacement.
(See details in https://blog.mozilla.org/addons/2015/08/21/the-future-of-developing-firefox-add-ons/).
Currently WebExtensions don't support certificate analysis. Add-ons like Ssleuth still use the
old, deprecated add-on API.  

