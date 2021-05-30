const url = 'http://192.168.43.89/sipumi/';

export const assets = {
  baseURL: 'http://192.168.43.89/sipumi/',

  api: {
    connection: url + 'connection.php',
    addReview: url + 'add_review.php',
    deleteProduk: url + 'delete_produk.php',
    deleteReview: url + 'delete_review.php',
    deleteUMKM: url + 'delete_umkm.php',
    editProfil: url + 'edit_profil.php',
    insertProduk: url + 'insert_produk.php',
    insertUMKM: url + 'insert_umkm.php',
    kategori: url + 'kategori.php',
    produk: url + 'produk.php',
    registration: url + 'registration.php',
    resetPass:  url + 'reset_pass.php',
    reviews:  url + 'reviews.php',
    updateProduk: url + 'update_produk.php',
    updateUMKM:  url + 'update_umkm.php',
    users:  url + 'users.php',
    view:  url + 'view.php'
  },

  icons: {
    ICProfile: url + 'assets/icons/ICProfile.png',
    ICFashion: url + 'assets/icons/ICFashion.png',
    ICDrink: url + 'assets/icons/ICDrink.png',
    ICHandmade: url + 'assets/icons/ICHandmade.png',
    ICFood: url + 'assets/icons/ICFood.png',
    ICFoods: url + 'assets/icons/ICFoods.png',
    ICStar: url + 'assets/icons/ICStar.png',
    ICBatik: url + 'assets/icons/ICBatik.png'
  },

  images: {
    IMLogo: url + 'assets/images/IMLogo.png',
    IMNoImage: url + 'assets/images/IMNoImage.png',
    IMUser: url + 'assets/images/IMUser.png',
    IMKabBlitar: url + 'assets/images/IMKabBlitar.png',
    IMBlank: url + 'assets/images/IMBlank.png',
    IMProdukKosong: url + 'assets/images/IMProdukKosong.png'
  }
};