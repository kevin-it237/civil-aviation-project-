export const checkIfLoader = (reducer, ...actionsToCheck) => 
reducer.loader.actions.some(action => actionsToCheck.includes(action));

/**
 * @description Update data when a change occur
 * @param {array} list
 * @param {object} item updated element
 * @param {string} idName updated element
 * @returns {array}
 */
export const updateList = (list, item, idName) => {
    const index = list.findIndex((listItem) => listItem[idName] === item[idName])
    let updatedList = [...list]
    updatedList[index] = item
    return updatedList
}