import smartpy as sp

FA2 = sp.io.import_script_from_url("https://smartpy.io/templates/fa2_lib.py")

class MultiToken(FA2.Fa2Fungible):
    pass

@sp.add_test(name = "NFT")
def test():
    scenario = sp.test_scenario()
    fa2_fungible = MultiToken(
        metadata = sp.utils.metadata_of_url("https://example.com")
    )
    scenario += fa2_fungible