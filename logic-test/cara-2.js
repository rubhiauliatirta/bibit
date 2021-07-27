/**
 *  CARA - 2
 *  + secara jumlah iterasi lebih sedikit sehingga lebih efisien
 *  - code dan logika pengelompokan lebih ribet karena pengelompokan berdasarkan word length
 *  - pengelompokan berhasil tapi urutan hasil kurang mirip test case
 * 
 *  asumsi: yang penting terkelompokan anagramnya, urutan tidak harus sesuai
 */

function groupAnagram(input) {
  const tempGroupByLength = {}
  input.forEach(word => {
    const wordLength = word.length
    if (!tempGroupByLength[wordLength]) {
      // jika belum ada length pada object, pasti dia membuat kelompok baru
      tempGroupByLength[wordLength] = {
        [word]: [word]
      }
      return
    }
    // jika ada length sesuai dengan wordLength, 
    // word akan di cek anagram atau tidak 
    // dengan semua key yang ada di length ini.
    for (let key in tempGroupByLength[wordLength]) {
      if (isAnagram(key, word)) {
        tempGroupByLength[wordLength][key].push(word)
        return
      }
    }
    tempGroupByLength[wordLength][word] = [word]
  });
  const result = []
  for (let key in tempGroupByLength) {
    for (let word in tempGroupByLength[key]) {
      result.push(tempGroupByLength[key][word])
    }
  }
  console.log(result)
}

function isAnagram(key, word) {
  // anagram ditandai dengan jumlah huruf dan jumlah masing2 karakter sama

  // jumlah huruf udah beda, pasti bukan anagram, tapi di file ini, key dan word pasti
  // memiliki jumlah huruf yang sama

  /*
    menyiapkan dictionary yang isinya adalah
    karakter: jumlah_karakter dari masing2 kata yang ingin dibandingkan
    sabana -> { s: 1, a: 3, b: 1, n: 1}
  */
  const keyCharacterCount = {}
  const wordCharacterCount = {}

  // melakukan iterasi untuk mengisi dictionary
  for (let i = 0; i < key.length; i++) {
    if (!keyCharacterCount[key[i]]) {
      keyCharacterCount[key[i]] = 1
    } else {
      keyCharacterCount[key[i]]++
    }
    if (!wordCharacterCount[word[i]]) {
      wordCharacterCount[word[i]] = 1
    } else {
      wordCharacterCount[word[i]]++
    }
  }
  for (let property in keyCharacterCount) {
    if (keyCharacterCount[property] !== wordCharacterCount[property]) {
      return false
    }
  }
  // pengecekan maksimal adalah 2n
  return true
}


groupAnagram(['kita', 'atik', 'tika', 'aku', 'kia', 'makan', 'kua', 'amkan', 'aki', 'mkaan', 'ika'])

/**
 *
 * 1. Logic Test
 * Anagram adalah istilah dimana suatu string jika dibolak balik ordernya maka akan sama eg.:  'aku' dan 'kua' adalah Anagram, 'aku' dan 'aka' bukan Anagram.
 * Dibawah ini ada array berisi sederetan Strings.
 * ['kita', 'atik', 'tika', 'aku', 'kia', 'makan', 'kua']
 * Silahkan kelompokkan/group kata - kata di dalamnya sesuai dengan kelompok Anagramnya.
 * Catatan: tidak boleh menggunakan syntax es6 map, sort, reduce, find, filter # Expected Outputs
 * [
 *  ["kita", "atik", "tika"],
 *  ["aku", "kua"],
 *  ["makan"],
 *  ["kia"]
 * ]
 *
 */