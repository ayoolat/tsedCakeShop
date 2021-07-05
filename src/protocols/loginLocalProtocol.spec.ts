// import * as Sinon from "sinon";
// import {PlatformTest} from "@tsed/common";
// import {users} from "../entity/users";
// import {UsersService} from "../provider/usersService";
// import {JwtProtocol} from "./LoginLocalProtocol";

// describe("JwtProtocol", () => {
//   beforeEach(() => PlatformTest.create());
//   afterEach(() => PlatformTest.reset());

//   describe(".$onVerify()", () => {
//     it("should return a user", async () => {
//       // GIVEN
//       const request = {};
//       const email = "email@domain.fr";
//       const password = "password";
//       const user = new users();
//       user.email = email;
//       user.password = password;

//       const usersService = {
//         findOne: Sinon.stub().resolves(user)
//       };

//       const protocol: JwtProtocol = await PlatformTest.invoke(JwtProtocol, [
//         {
//           token: UsersService,
//           use: usersService
//         }
//       ]);

//       // WHEN 
//       const result = await protocol.$onVerify(request as any, {email, password});

//       // THEN
//       usersService.findOne.should.be.calledWithExactly({email: "email@domain.fr"});
//       result.should.deep.equal(user);
//     });
//     it("should return a user", async () => {
//       // GIVEN
//       const request = {};
//       const email = "email@domain.fr";
//       const password = "password";
//       const user = new users();
//       user.email = email;
//       user.password = `${password}2`;

//       const usersService = {
//         findOne: Sinon.stub().resolves(user)
//       };

//       const protocol: JwtProtocol = await PlatformTest.invoke(JwtProtocol, [
//         {
//           token: UsersService,
//           use: usersService
//         }
//       ]);

//       // WHEN
//       const result = await protocol.$onVerify(request as any, {email, password});

//       // THEN
//       usersService.findOne.should.be.calledWithExactly({email: "email@domain.fr"});
//       result.should.deep.equal(false);
//     });
//     it("should return a false when user isn't found", async () => {
//       // GIVEN
//       const request = {};
//       const email = "email@domain.fr";
//       const password = "password";

//       const usersService = {
//         findOne: Sinon.stub().resolves(undefined)
//       };

//       const protocol: JwtProtocol = await PlatformTest.invoke(JwtProtocol, [
//         {
//           token: UsersService,
//           use: usersService
//         }
//       ]);

//       // WHEN
//       const result = await protocol.$onVerify(request as any, {email, password});

//       // THEN
//       usersService.findOne.should.be.calledWithExactly({email: "email@domain.fr"});
//       result.should.deep.equal(false);
//     });
//   });
// });