import counterModel from "../models/counter";

export async function incrementAndGetWishListCounter() {
  try {
    let counter = await counterModel.findOne({ name: "counters" });
    let count = counter?.wishList ? counter.wishList : 0;
    if (counter) {
      await counter.updateOne({ $inc: { wishList: 1 } });
      count++;
    } else {
      await counterModel.create({ name: "counters", wishList: 1 });
      count = 1;
    }

    return Promise.resolve(count);
  } catch (err) {
    return Promise.reject();
  }
}
