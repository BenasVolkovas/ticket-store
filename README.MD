# Commands

```
ligo compile contract contracts/marketplace.jsligo > artifacts/marketplace.tz
ligo compile storage contracts/storage.jsligo "default_storage"
octez-client originate contract marketplace transferring 0 from test1 running artifacts/marketplace.tz --init '(Pair (Pair (Pair { "tz1iTL7dzcqj8iPfrTw6sPLKbKdMnH2vhm27" } {}) {} {}) (Pair {} {}) {} {})' --burn-cap 3
```
