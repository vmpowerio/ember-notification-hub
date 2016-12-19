module.exports = {
    normalizeEntityName: function () {}, // no-op since we're just adding dependencies

    afterInstall: function () {
        return this.addBowerPackageToProject('roboto-fontface')
            .then(() => {
                return this.addBowerPackageToProject('material-design-icons');
            });
    }
};
