import {
  objectType,
  extendType,
  nonNull,
  intArg,
  stringArg,
  booleanArg,
} from "nexus";

export const User = objectType({
  name: "User",
  definition(t) {
    t.int("id");
    t.nullable.string("name");
    t.string("email");
    t.nullable.string("phoneNumber");
    t.boolean("onlineStatus");
    t.string("birthDay");
    t.string("password");
  },
});

export const UserQuery = extendType({
  type: "Query",
  definition(t) {
    // get all users
    t.nonNull.list.field("getAllUsers", {
      type: "User",
      resolve: async (_root, _args, ctx) => {
        return await ctx.db.user.findMany();
      },
    });
    // get user by id
    t.field("getUserById", {
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

export const UserMutation = extendType({
  type: "Mutation",
  definition(t) {
    // create a new User
    t.nonNull.field("createUser", {
      type: "User",
      args: {
        name: nonNull(stringArg()),
        birthDay: nonNull(stringArg()),
        email: nonNull(stringArg()),
        password: nonNull(stringArg()),
        phoneNumber: nonNull(stringArg()),
        onlineStatus: nonNull(booleanArg()),
      },
      resolve: async (_root, args, ctx) => {
        return await ctx.db.user.create({
          data: {
            name: args.name,
            birthDay: args.birthDay,
            email: args.email,
            onlineStatus: args.onlineStatus,
            password: args.password,
            phoneNumber:args.phoneNumber
          },
        });
      },
    });
  },
});
