import smartpy as sp

FA2 = sp.io.import_script_from_url("https://smartpy.io/templates/fa2_lib.py")

class MultiToken(FA2.Fa2Fungible):
    pass

@sp.add_test(name = "NFT")
def test():
    sc = sp.test_scenario()
    sc.table_of_contents()
    sc.h2("FA2")
    example_fa2_fungible = MultiToken(
        metadata = sp.utils.metadata_of_url("https://example.com")
    )
    sc += example_fa2_fungible