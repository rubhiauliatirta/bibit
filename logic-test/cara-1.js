/**
 *  CARA - 1
 *  + code lebih singkat dan logika lebih mudah
 *  + hasil lebih mirip dengan test case
 *  - secara iterasi sebenarnya agak boros kalau inputnya ratusan ribu word 
 *    karena harus mengecek ke word dengan length yang berbeda
 * 
 *  asumsi: 
 *   - tidak apa urutan hasilnya beda sedikit, karena sepertinya tidak mungkin hasilnya seperti
 *     expected output di soal minta jika urutan inputnya seperti di soal [..., 'kia', 'makan', 'kua']
 *   - harusnya agar output sesuai inputnya: [..., 'kua', 'makan', 'kia']
 */

function groupAnagram(input) {
  const tempGroup = {}
  input.forEach(word => {
    if (Object.keys(tempGroup).length === 0) {
      tempGroup[word] = [word]
      return
    }
    for (let key in tempGroup) {
      if (isAnagram(key, word)) {
        tempGroup[key].push(word)
        return
      }
    }
    tempGroup[word] = [word]
  })
  console.log(Object.values(tempGroup))
}

function isAnagram(key, word) {
  // anagram ditandai dengan jumlah huruf dan jumlah masing2 karakter sama

  // jumlah huruf udah beda, pasti bukan anagram
  if (key.length !== word.length) {
    return false
  }

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


groupAnagram(['kita', 'atik', 'tika', 'aku', 'kia', 'makan', 'kua'])

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