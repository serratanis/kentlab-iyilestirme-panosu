# KentLab — Proje Özeti ve Sunum Notları

## 1. Problem

Mahallelerde yaşayan insanların iyi fikirleri; mesajlar, toplantı notları ve farklı belgeler arasında kaybolabiliyor. Karar vericiler hangi fikrin daha acil, etkili veya uygulamaya hazır olduğunu tek bakışta göremiyor.

## 2. Çözüm

KentLab, yerel iyileştirme fikirlerini ortak bir panoda toplar. Her fikir kategori, mahalle, öncelik, süreç durumu ve 100 üzerinden beklenen etki puanıyla kayıt altına alınır. Canlı özet kartları, karar vericilerin genel tabloyu hızla anlamasını sağlar.

## 3. Temel kullanıcı akışı

1. Kullanıcı “Yeni fikir” düğmesine basar.
2. Başlık, açıklama, kategori, bölge, öncelik, durum ve etki puanını girer.
3. Fikir panoya eklenir ve özet göstergeleri anında güncellenir.
4. Kullanıcı arama ve filtrelerle ilgili kayda ulaşır.
5. Kaydı düzenleyebilir veya onay adımından sonra silebilir.
6. Tüm değişiklikler LocalStorage sayesinde aynı tarayıcıda korunur.

## 4. Teknik yaklaşım

- React bileşenleri arayüzü küçük, yeniden kullanılabilir parçalara ayırır.
- TypeScript veri modelindeki hataları geliştirme aşamasında yakalar.
- Vite hızlı geliştirme ve optimize edilmiş üretim çıktısı sağlar.
- LocalStorage, sunucu gerektirmeden kalıcı kayıt deneyimi sunar.
- Pure CSS, projeye özgü ve responsive bir görsel kimlik oluşturur.

## 5. Kalite ve doğrulama

- Dört CRUD işlemi gerçek tarayıcıda denendi.
- Arama ve filtre sonuçları doğrulandı.
- 390 piksel mobil genişliğinde yatay taşma olmadığı kontrol edildi.
- TypeScript üretim derlemesi başarıyla tamamlandı.
- Metrik ve filtreleme mantığı otomatik testlerle doğrulandı.
- Tarayıcı konsolunda hata veya uyarı bulunmadı.

## 6. Gelecek geliştirmeler

Bir sonraki aşamada kullanıcı hesapları, ortak veri tabanı, fikir oylama, harita üzerinde konum seçimi ve yönetici rolü eklenebilir. Bu sürüm eğitim yönergesindeki frontend ve CRUD hedeflerine odaklanır.

## 30 saniyelik sunum metni

“KentLab, mahallelerden gelen iyileştirme fikirlerini görünür ve takip edilebilir hale getiren bir karar destek panosudur. Kullanıcılar fikir ekleyebilir, mevcut kayıtları arayıp filtreleyebilir, güncelleyebilir ve güvenli şekilde silebilir. Öncelik, süreç durumu ve etki puanı sayesinde fikirler yalnızca listelenmez; karar vermeyi kolaylaştıran anlamlı bir özete dönüşür. React, TypeScript ve LocalStorage ile geliştirdiğim uygulama tamamen responsive, erişilebilir ve canlı ortamda çalışır.”
