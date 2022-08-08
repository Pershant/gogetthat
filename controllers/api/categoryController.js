const models = require('../../models');
// const database = require('../../db/db');
const sequelize = require('sequelize');
const Op = sequelize.Op;
const helper = require('../../helpers/helper');
const { request } = require('express');
const category = require('../../models/category');
// const constants = require('../../config/constants');

const model = 'category';
const modelName = 'Category';

module.exports = {

    categoryFormattedListing: async(req, res) => {
        try {
            const required = {
                securitykey: req.headers.securitykey,
            };
            const nonRequired = {
                searchKeyword: req.body.searchKeyword,
            };

            let requestData = await helper.vaildObject(required, nonRequired);

            // const categoryChildrenIds = await module.exports.getCategoryChildren(requestData.categoryId);
            // const categoryAndChildrenIds = [parseInt(requestData.categoryId), ...categoryChildrenIds];

            // console.log(categoryAndChildrenIds, '======>categoryAndChildrenIds');


            let categories = await module.exports.getParentCategory().then(data => {
                    console.log(requestData.searchKeyword, '====>searchKeyword');
                    return data.filter(category => category.label.toLowerCase().includes(requestData.searchKeyword));
                })
                // console.log(categories, '===>categories');
                // return;

            const responseData = categories;

            return helper.success(res, `${modelName} listing fetched successfully.`, responseData);
        } catch (err) {
            return helper.error(res, err);
        }
    },
    categoryListing: async(req, res) => {
        try {
            const required = {
                securitykey: req.headers.securitykey,
            };
            const nonRequired = {
                searchKeyword: req.body.searchKeyword,
                categoryId: req.body.categoryId,
                shop_category_id: req.body.shop_category_id,
            };

            let requestData = await helper.vaildObject(required, nonRequired);
            var whereLogic = {
                parentId: requestData.hasOwnProperty('categoryId') && requestData.categoryId ? requestData.categoryId : null
            }
            if(requestData.shop_category_id && requestData.shop_category_id!=''){
                whereLogic.shop_category_id = requestData.shop_category_id;
            }
            let responseData = await module.exports.findAll(req, res, whereLogic).then(data => {
                console.log(requestData.searchKeyword, '====>searchKeyword');
                return !(requestData.hasOwnProperty('searchKeyword') && requestData.searchKeyword) ?
                    data :
                    data.filter(category => category.name.toLowerCase().includes(requestData.searchKeyword));
            });

            return helper.success(res, `${modelName} listing fetched successfully.`, responseData);
        } catch (err) {
            return helper.error(res, err);
        }
    },
    category_list: async(req, res) => {
        try {
            const required = {
             //   securitykey: req.headers.securitykey,
            };
            const nonRequired = {
                searchKeyword: req.body.searchKeyword,
                categoryId: req.body.categoryId,
            };

            let requestData = await helper.vaildObject(required, nonRequired);

            let responseData = await module.exports.findAll(req, res, {
                parentId: requestData.hasOwnProperty('categoryId') && requestData.categoryId ? requestData.categoryId : null,
            }).then(data => {
                console.log(requestData.searchKeyword, '====>searchKeyword');
                return !(requestData.hasOwnProperty('searchKeyword') && requestData.searchKeyword) ?
                    data :
                    data.filter(category => category.name.toLowerCase().includes(requestData.searchKeyword));
            });

            return helper.success(res, `${modelName} listing fetched successfully.`, responseData);
        } catch (err) {
            return helper.error(res, err);
        }
    },
    getCategoryChildren: async(id = undefined) => {
        const categories = await models.category.findAll({
            order: [
                ['id', 'DESC']
            ],
            // hierarchy: true,
            raw: true,
        });

        console.log(JSON.stringify(categories, null, 2), '===============>categories');

        let parentIdChildren = [];

        let childrenArray = [];

        const getParentIdChildren = (children, hierarchyArray) => {
            if (children.length == 0) return;

            children.forEach(child => {
                // if (id && child.parentId != id) return;

                // console.log(child.name, '================>child.name');
                const newHierarchyArray = JSON.parse(JSON.stringify(hierarchyArray));
                // console.log(newHierarchyArray, '==+>newHierarchyArray');
                newHierarchyArray.push(child.name);
                console.log(child.parentId, '====+>child.parentId')
                if (child.parentId == id) {
                    parentIdChildren.push(child);
                }

                if (child.parentId != id && child.hasOwnProperty('children') && child.children.length > 0) {
                    getParentIdChildren(child.children, newHierarchyArray);
                }
            });
        }

        const checkChildren = (children, hierarchyArray) => {
            if (children.length == 0) return;

            children.forEach(child => {
                // if (id && child.parentId == id) return;

                console.log(child.name, '================>child.name');
                const newHierarchyArray = JSON.parse(JSON.stringify(hierarchyArray));
                newHierarchyArray.push(child.name);
                childrenArray.push(child.id);

                if (child.hasOwnProperty('children') && child.children.length > 0) {
                    checkChildren(child.children, newHierarchyArray);
                }
            });
        }

        if (categories.length > 0) {
            getParentIdChildren(categories, ['parent']);
            // return parentIdChildren;

            if (parentIdChildren && parentIdChildren.length > 0) {
                const hierarchyArray = [];
                hierarchyArray.push('parent');
                checkChildren(parentIdChildren, hierarchyArray);
            }


            // categories.forEach(category => {
            //     // parent.push({
            //     //     value: category.id,
            //     //     label: category.name
            //     // });

            //     if (category.hasOwnProperty('children') && category.children.length > 0) {
            //         const hierarchyArray = [];
            //         hierarchyArray.push(category.name);
            //         checkChildren(category.children, hierarchyArray);
            //     }
            // });
        }

        // console.log(JSON.stringify(childrenArray, null, 2), '===================>data');
        // // return;

        return childrenArray;
        // return parentIdChildren;
    },
    getParentCategory: async(id = undefined) => {
        const categories = await models.category.findAll({
            order: [
                ['id', 'DESC']
            ],
            // hierarchy: true,
            raw: true,
        });

        console.log(JSON.stringify(categories, null, 2), '===============>categories');

        let parent = [];

        const checkChildren = (children, hierarchyArray) => {
            if (children.length == 0) return;

            children.forEach(child => {
                if (id && child.id == id) return;

                console.log(child.name, '================>child.name');
                const newHierarchyArray = JSON.parse(JSON.stringify(hierarchyArray));
                newHierarchyArray.push(child.name);
                parent.push({
                    value: child.id,
                    label: newHierarchyArray.join(' > ')
                });

                if (child.hasOwnProperty('children') && child.children.length > 0) {
                    checkChildren(child.children, newHierarchyArray);
                }
            });
        }

        if (categories.length > 0) {
            categories.forEach(category => {
                parent.push({
                    id: category.id,
                    label: category.name
                });

                if (category.hasOwnProperty('children') && category.children.length > 0) {
                    const hierarchyArray = [];
                    hierarchyArray.push(category.name);
                    checkChildren(category.children, hierarchyArray);
                }
            });
        }

        console.log(JSON.stringify(parent, null, 2), '===================>data');
        // return;

        // parent.unshift({
        //     value: null,
        //     label: 'Choose as a Parent Category'
        // });

        return parent;
    },
    findAll: async(req, res, where = {}, obj = {}) => {
        return await models[model].findAll({
            where: {
                status: 1,
                ...where,
            },
            attributes: [
                'id',
                'name',
                // 'hierarchyLevel'   
            ],
            order: [
                ['id', 'DESC']
            ],
            ...obj,
        }).map(modelItem => modelItem.toJSON());
    },

    shop_categories: async(req, res) => {
        try {
            const required = {
             //   securitykey: req.headers.securitykey,
            };
            const nonRequired = {
                // searchKeyword: req.body.searchKeyword,
                // categoryId: req.body.categoryId,
            };

            let requestData = await helper.vaildObject(required, nonRequired);

            let responseData = await models['shopCategory'].findAll({
                attributes: {
                    include: [
                        helper.makeImageUrlSql('shopCategory', 'image', 'category')
                    ]
                },
                order: [['id', 'DESC']]
            }).then(data => {
                console.log(requestData.searchKeyword, '====>searchKeyword');
                return data;
                // return !(requestData.hasOwnProperty('searchKeyword') && requestData.searchKeyword) ?
                //     data :
                //     data.filter(category => category.name.toLowerCase().includes(requestData.searchKeyword));
            });

            return helper.success(res, `Shop Category listing fetched successfully.`, responseData);
        } catch (err) {
            return helper.error(res, err);
        }
    },
}