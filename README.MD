# Commands

```
ligo compile contract contracts/marketplace.jsligo > artifacts/marketplace.tz
ligo compile storage contracts/storage.jsligo "default_storage"
octez-client originate contract marketplace transferring 0 from test1 running artifacts/marketplace.tz --init '(Pair (Pair (Pair { "tz1iTL7dzcqj8iPfrTw6sPLKbKdMnH2vhm27" } {}) {} {}) (Pair {} {}) {} {})' --burn-cap 3 --force
```

original
KT1S8j7axXa4BbSQTgS1HaDBbPmpXCkDenu7

without id and discription in mint
KT1TqJmb8wrfxgiXAhCgf6CH8H6UFSTdHBbT

views
KT1RTh21hG1RfnhLVtZaJc7VR7sfFVpiWMQN

# Colors

- #1b1a12
- #f3c64a
- #3db3a6
- #895381
