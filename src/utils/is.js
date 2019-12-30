/**
 * objectType
 *
 * @param {Object} object
 * @return {Boolean}
 */
export const objectType = object => {
  return Object.prototype.toString
    .call(object)
    .slice(8, -1)
    .toLowerCase();
};

/**
 * isNumber
 *
 * @param {Object} value
 * @return {Boolean}
 */
export const isNumber = function(value) {
  return objectType(value) === "number";
};

/**
 * isString
 *
 * @param {Object} value
 * @return {Boolean}
 */
export const isString = function(value) {
  return objectType(value) === "string";
};

/**
 * isArray
 *
 * @param {Object} value
 * @return {Boolean}
 */
export const isArray =
  Array.isArray ||
  function(value) {
    return objectType(value) === "array";
  };

/**
 * isBoolean
 *
 * @param {Object} value
 * @return {Boolean}
 */
export const isBoolean = function(value) {
  return objectType(value) === "boolean";
};

/**
 * isUndefined
 * 
 * @param {Object} value
 * @return {Boolean}
 */
export const isUndefined = function(value) {
  return objectType(value) === "undefined";
};

/**
 * isNull
 * 
 * @param {Object} value
 * @return {Boolean}
 */
export const isNull = function(value) {
  return objectType(value) === "null";
};

/**
 * isSymbol
 * 
 * @param {Object} value
 * @return {Boolean}
 */
export const isSymbol = function(value) {
  return objectType(value) === "symbol";
};

/**
 * isFunction
 * 
 * @param  {Object}  value
 * @return {Boolean}
 */
export const isFunction = function(value) {
  return objectType(value) === "function";
};

/**
 * isRegExp
 * 
 * @param {Object} value
 * @return {Boolean}
 */
export const isRegExp = function(value) {
  return objectType(value) === "regexp";
};


/**
 * isBlob
 * 
 * @param  {Object}  value
 * @return {Boolean}
 */
export const isBlob = function(value) {
  return objectType(value) === "blob";
};

/**
 * isArrayBuffer
 * 
 * @param {Object} value
 * @return {Boolean}
 */
export const isArrayBuffer = function(value) {
  return objectType(value) === "arraybuffer";
};


/**
 * isObject
 * 
 * @param  {Object}  object
 * @return {Boolean}
 */
export const isObject = function(value) {
  return objectType(value) === "object";
};

/**
 * isWindow 检测对象是否是window对象
 * 
 * @param  {Object}  object [description]
 * @return {Boolean}     [description]
 */
export const isWindow = function(object) {
  return object != null && object === object.window;
};

/**
 * isEmptyObject 检测对象是否是空的(即不包含属性)
 * 
 * @param  {Object}  object [description]
 * @return {Boolean}     [description]
 */
export const isEmptyObject = object => {
  for (let key in object) {
    return false;
  }
  return true;
};

/**
 * isPlainObject 判断指定参数是否是一个纯粹的对象
 * 
 * @param  {Object}  object [description]
 * @return {Boolean}     [description]
 */
export const isPlainObject = object => {
  return (
    isObject(object) &&
    !isWindow(object) &&
    Object.getPrototypeOf(object) === Object.prototype
  );
};

export default {
  objectType,
  isNumber,
  isString,
  isArray,
  isBoolean,
  isUndefined,
  isNull,
  isSymbol,
  isFunction,
  isRegExp,
  isBlob,
  isArrayBuffer,
  isObject,
  isWindow,
  isEmptyObject,
  isPlainObject
};
