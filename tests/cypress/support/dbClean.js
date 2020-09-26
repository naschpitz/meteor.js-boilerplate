const collectionsNames = db.getCollectionNames();

collectionsNames.forEach((collectionName) => {
    if (collectionName === "authorization_groups") {
        db.authorization_groups.remove({name: {$ne: 'systemUsers'}});
        db.authorization_groups.update({name: 'systemUsers'}, {$set: {members: []}})
    }

    else if (collectionName === "payment_plans") {
        // Do nothing.
    }

    else {
        const collection = db.getCollection(collectionName);
        collection.drop();
    }
});