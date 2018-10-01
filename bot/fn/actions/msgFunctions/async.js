var con = require("../../conn");

module.exports = {
    allowed: function (id) {
        let q = "SELECT*FROM moderators WHERE mod_id = " + id;
        return new Promise(resolve => {
            con.query(q, function (err, res) {
                res.length > 0 ? resolve(true) : resolve(false);
            });
        });
    },

    checkPerm: async function (id, role) {
        return new Promise(resolve => {
            let q1 = "SELECT perm FROM moderators WHERE mod_id = " + id;
            let q2 = "SELECT perm FROM roles WHERE role_name = '" + role + "' LIMIT 1";

            con.query(q1, function (err, res) {
                con.query(q2, function (error, result) {
                    if (!result[0]) throw "Tą rolą nie można zarządzać z poziomu komend.";
                    if (res[0].perm <= result[0].perm) resolve(true);
                    else throw "Nie masz wystarczającego dostępu aby zarządzać tą rolą.";
                });
            });
        });
    }
}