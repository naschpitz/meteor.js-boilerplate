import SimpleSchema from 'simpl-schema';

export default DatesSchema = new SimpleSchema({
    createdAt: {
        type: Date,
        label: "Created At",
        optional: true,
        autoValue: function () {
            if (this.isInsert)
                return new Date();

            else if (this.isUpsert)
                return {$setOnInsert: new Date()};

            else
                this.unset();
        },
    },
    updatedAt: {
        type: Date,
        label: "Updated At",
        autoValue: function () {
            return new Date();
        }
    },
});
