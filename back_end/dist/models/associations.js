"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = setupAssociations;
const user_1 = __importDefault(require("./user"));
const UserDetails_1 = __importDefault(require("./UserDetails"));
function setupAssociations() {
    user_1.default.hasOne(UserDetails_1.default, {
        foreignKey: 'userId',
        as: 'details',
    });
    UserDetails_1.default.belongsTo(user_1.default, {
        foreignKey: 'userId',
        as: 'user',
    });
}
