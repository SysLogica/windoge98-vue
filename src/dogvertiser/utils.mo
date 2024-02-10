import Types "./types";
import Blob "mo:base/Blob";
import Array "mo:base/Array";
import Principal "mo:base/Principal";
import Nat8 "mo:base/Nat8";
import Hash "mo:base/Hash";
import Text "mo:base/Text";
import Nat "mo:base/Nat";

module {
  public func hashNat(id : Nat) : Hash.Hash {
		Text.hash(Nat.toText(id));
	};


  public func hashText(text : Text): Hash.Hash {
        Text.hash(text);
  };

  /// Convert Principal to ICRC1.Subaccount
  // from https://github.com/research-ag/motoko-lib/blob/2772d029c1c5087c2f57b022c84882f2ac16b79d/src/TokenHandler.mo#L51
  public func toSubaccount(p : Principal) : Types.Subaccount {
    // p blob size can vary, but 29 bytes as most. We preserve it'subaccount size in result blob
    // and it'subaccount data itself so it can be deserialized back to p
    let bytes = Blob.toArray(Principal.toBlob(p));
    let size = bytes.size();

    assert size <= 29;

    let a = Array.tabulate<Nat8>(
      32,
      func(i : Nat) : Nat8 {
        if (i + size < 31) {
          0;
        } else if (i + size == 31) {
          Nat8.fromNat(size);
        } else {
          bytes[i + size - 32];
        };
      },
    );
    return Blob.fromArray(a);
  };

  public func toAccount(caller : Principal) : Types.Account {
    {
      owner = caller;
      subaccount = ?toSubaccount(caller);
    };
  };
};