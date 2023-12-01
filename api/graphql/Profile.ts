import { objectType, extendType } from "nexus";

export const Profile = objectType({
  name: "Profile",
  definition(t) {
    t.nonNull.int("id");
    t.string("bio");
    t.int("likes");
    t.int("liked");
  },
});

export const profileQuery = extendType({
  type: "Query",
  definition(t) {
    t.list.field("profiles", {
      type: "Profile",
      resolve(_root, _args, ctx) {
        return ctx.db.profile.findMany();
      },
    });
  },
});
