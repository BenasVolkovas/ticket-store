# Commands

```
ligo compile contract contracts/marketplace.jsligo > artifacts/marketplace.tz
ligo compile storage contracts/storage.jsligo "default_storage"
octez-client originate contract marketplace transferring 0 from test1 running artifacts/marketplace.tz --init '(Pair (Pair (Pair { "tz1iTL7dzcqj8iPfrTw6sPLKbKdMnH2vhm27" } {}) {} {}) (Pair {} {}) {} {})' --burn-cap 3 --force
```

# Colors

- #1b1a12
- #f3c64a
- #3db3a6
- #895381
