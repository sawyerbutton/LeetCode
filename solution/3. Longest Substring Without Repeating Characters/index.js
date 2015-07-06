/**
 * 时间复杂度超高，第一版算法
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring1 = function(s) {
  var substr, subStringList = [];
  var longLength = 0;
  var offsetList = [];

  for (var length = 1; length <= s.length / 2; length++) {
    for (var offset = 0; offset < s.length - length; offset++) {
      substr = s.substr(offset, length);
      var isRepeatCheck = subStringList.some(function (item) {
        if (0 !== substr.length % item.length || substr.length === 1 || substr === item) {
          return false;
        }

        for(var index = 0; index < substr.length; index++) {
          if (substr[index] !== item[index % item.length]){
            return false;
          }
        }

        return true;
      });
      if (!isRepeatCheck) {
        subStringList.push(s.substr(offset, length));
      }
    }
  }

  var allRepeatSubString = subStringList.map(function (item) {
    var firstIndex = s.indexOf(item);
    var lastIndex = s.lastIndexOf(item);

    return firstIndex !== -1 && lastIndex !== -1 && firstIndex !== lastIndex ? item.length : 0;
  });
  if (allRepeatSubString.length > 0)
  longLength = allRepeatSubString.reduce(function (before, now) {
    return now > before ? now : before;
  });
  return longLength;
};

/**
 * 回头算法
 * O(n^2)
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring2 = function(s) {
  'use strict';
  var hashTab = {};
  var len = 0;
  var maxlen = 0;
  for (var index = 0; index < s.length; index++) {
    if (typeof hashTab[s[index]] === 'undefined') {
      hashTab[s[index]] = index;
      if (++len > maxlen) {
        maxlen = len;
      }
    } else {

      maxlen = Math.max(maxlen, len);
      index = index - len + 1;
      hashTab = {};
      hashTab[s[index]] = index;
      len = 1;
    }
  }
  return maxlen;
};

/**
 * 为何要回头呢
 * O(n)
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function(s) {
  'use strict';
  var hashTab = {};
  var len = 0;
  var maxlen = 0;
  for (var index = 0; index < s.length; index++) {
    if (typeof hashTab[s[index]] === 'undefined') {
      hashTab[s[index]] = index;
      if (++len > maxlen) {
        maxlen = len;
      }
    } else {
      for (var key in hashTab) {
        if (hashTab[key] < hashTab[s[index]]) {
          delete hashTab[key];
          len--;
        }
      }
      //var keys = Object.keys(hashTab);
      //for (var keyIndex = 0; keyIndex < keys.length; keyIndex++) {
      //  if (hashTab[keys[keyIndex]] < hashTab[s[index]]) {
      //    delete hashTab[keys[keyIndex]];
      //  }
      //}
      //len = Object.keys(hashTab).length;
      hashTab[s[index]] = index;
    }
  }
  return maxlen;
};

module.exports = {
  lengthOfLongestSubstring: lengthOfLongestSubstring
};