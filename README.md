Bu proje, Remix Framework ve TypeScript kullanılarak geliştirilmiştir. Unit testler için Jest ve React Testing Library kullanılmıştır. CSS olarak Tailwind CSS kullanılmıştır.

## Proje Özeti

Bu proje, ürün listeleme ve ürün detayı gösteren bir uygulamadır. Ana sayfada yatay ve dikey olarak API'den gelen ürünler listelenmektedir. Yatay listelenen ürünler için basit bir slider component tasarlanmış ve ürünler bu şekilde gösterilmiştir. Ürün listeleme sayfasında ürünlere tıklandığında, ürün detay sayfası açılarak ürün detayları gösterilmektedir.

## Kurulum

Projeyi klonladıktan sonra bağımlılıkları yüklemek için:

```sh
npm install
```

## Geliştirme

Geliştirme sunucusunu çalıştırmak için:

```sh
npm run dev
```

## Testler

Unit testleri çalıştırmak için:

```sh
npm test
```

Testleri çalıştırmadan önce, projenin bağımlılıklarının yüklü olduğundan emin olun (`npm install` komutunu çalıştırarak). Testler Jest ve React Testing Library kullanılarak yazılmıştır. Test dosyaları genellikle `__tests__` dizininde veya `.test.ts`/`.test.tsx` uzantılı dosyalarda bulunur.

## Dağıtım

Öncelikle, uygulamanızı production için build edin:

```sh
npm run build
```

Ardından uygulamayı production modunda çalıştırın:

```sh
npm start
```

Şimdi uygulamanızı deploy etmek için bir host seçmeniz gerekecek.

### DIY

Eğer Node uygulamalarını deploy etme konusunda deneyiminiz varsa, built-in Remix app server production için hazırdır.

`npm run build` komutunun çıktısını deploy ettiğinizden emin olun:

- `build/server`
- `build/client`

## Styling

Bu template, basit bir başlangıç deneyimi için Tailwind CSS ile yapılandırılmıştır. İstediğiniz CSS framework'ünü kullanabilirsiniz. Daha fazla bilgi için [Vite docs on css](https://vitejs.dev/guide/features.html#css) sayfasına bakabilirsiniz.

## Katkıda Bulunma

Katkıda bulunmak isterseniz, lütfen bir pull request gönderin veya bir issue açın.
