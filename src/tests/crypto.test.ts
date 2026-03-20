import { createHash } from "@/app/utils/crypto"

test("Password Hash", ()=> {
    expect(createHash("Admin<>2094")).toBe("b8b5e195e89d7e4921ef6cf2936d07f3")
})