import {
  objectType,
  extendType,
  nonNull,
  intArg,
  list,
  arg,
  stringArg,
  booleanArg,
} from "nexus";
import { isBooleanObject } from "util/types";

export const User = objectType({
  name: "User",
  definition(t) {
    t.nonNull.int("id");
    t.nonNull.string("name");
    t.nonNull.string("email");
    t.nonNull.string("website");
    t.nullable.string("phoneNumber");
    t.nonNull.boolean("onlineStatus");
    t.nonNull.int("birthDay");
    t.nullable.string("password");
    // t.nonNull.list.nonNull.field("profile", {
    //   type: "Profile",
    //   resolve: (parent, _, ctx) => {
    //     return ctx.db.profile
    //       .findUnique({
    //         where: { id: parent.id },
    //       }).user()
    //   },
    // });
  },
});

export const UserQuery = extendType({
  type: "Query",
  definition(t) {
    // get all companies
    t.list.field("users", {
      type: "User",
      resolve(_root, _args, ctx) {
        return ctx.db.user.findMany();
      },
    });
    // get company by id
    t.field("user", {
      type: "User",
      args: {
        id: nonNull(intArg()),
      },
      resolve(_root, args, ctx) {
        return ctx.db.user.findUnique({
          where: { id: args.id },
        });
      },
    });
  },
});

export const CompanyMutation = extendType({
  type: "Mutation",
  definition(t) {
    // create a new company
    t.nonNull.field("createUser", {
      type: "User",
      args: {
        id: intArg(),
        name: nonNull(stringArg()),
        // birthDay: nonNull(stringArg()),
        bio: nonNull(stringArg()),
        email: nonNull(stringArg()),
        password: nonNull(stringArg()),
        phoneNumber: nonNull(stringArg()),
        onlineStatus: nonNull(booleanArg()),
      },
      resolve(_root, args, ctx) {
        return ctx.db.user.create({
          data: {
            name: args.name,
            birthDay: args.birthDay,
            email: args.email,
            onlineStatus: args.onlineStatus,
            password: args.password,
          },
        });
      },
    });
  },
});
