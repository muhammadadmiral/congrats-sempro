import { motion } from 'framer-motion';
import { FiBook, FiTarget, FiSearch, FiAward, FiCalendar, FiUsers, FiStar, FiCpu } from 'react-icons/fi';

const InfoCard = ({ icon, title, children, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="card dark:bg-gray-800 dark:border-gray-700 hover:scale-[1.02] transition-transform"
    >
      <div className="flex items-start">
        <div className="flex-shrink-0 bg-gradient-to-br from-primary-500 to-secondary-500 p-3 rounded-lg text-white mr-4">
          {icon}
        </div>
        <div>
          <h3 className="text-lg font-bold mb-2 dark:text-white">{title}</h3>
          <div className="text-gray-600 dark:text-gray-300 text-sm">
            {children}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const ThesisInfoSection = () => {
  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto text-center mb-12"
        >
          <h2 className="section-title dark:text-white">Tentang Penelitian</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Skripsi Nur Fadiyah Azzizah meneliti tentang adsorpsi nitrat menggunakan material inovatif
          </p>
          <div className="card-fancy dark:bg-gray-800 border-none p-6 mb-10 text-left">
            <h3 className="text-xl font-bold mb-4 gradient-text">
              Pengaruh Waktu Kontak dan Kekuatan Ionik terhadap Adsorpsi Nitrat Menggunakan Aluminium Hidroksida dalam Agarosa sebagai Gel Pengikat Diffusive Gradient in Thin Films (DGT)
            </h3>
            <p className="italic text-gray-600 dark:text-gray-400 text-sm mb-2">
              Departemen Kimia, Fakultas Matematika dan Ilmu Pengetahuan Alam, Universitas Brawijaya
            </p>
          </div>
        </motion.div>
        
        <div className="grid md:grid-cols-2 gap-6">
          <InfoCard 
            icon={<FiBook size={24} />} 
            title="Latar Belakang Penelitian"
            delay={0.1}
          >
            <p>
              Nitrat merupakan parameter kimia pencemaran air yang perlu diperhatikan. Keberadaan nitrat yang melebihi ambang batas dapat menyebabkan eutrofikasi dan gangguan kesehatan seperti <em>blue baby syndrome</em>. Penelitian ini berfokus pada pengembangan metode pengambilan sampel yang efektif menggunakan DGT.
            </p>
          </InfoCard>
          
          <InfoCard 
            icon={<FiTarget size={24} />} 
            title="Tujuan Penelitian"
            delay={0.2}
          >
            <ol className="list-decimal ml-4 space-y-1">
              <li>Mengetahui pengaruh waktu kontak terhadap adsorpsi nitrat menggunakan aluminium hidroksida dalam agarosa sebagai gel pengikat DGT.</li>
              <li>Mengetahui pengaruh kekuatan ionik terhadap adsorpsi nitrat menggunakan aluminium hidroksida dalam agarosa sebagai gel pengikat DGT.</li>
            </ol>
          </InfoCard>
          
          <InfoCard 
            icon={<FiSearch size={24} />} 
            title="Metodologi Penelitian"
            delay={0.3}
          >
            <p>
              Penelitian menggunakan metode eksperimental dengan variasi waktu kontak (20, 40, 60, 120, 240, dan 1440 menit) dan variasi kekuatan ionik untuk menganalisis adsorpsi nitrat. Pengukuran dilakukan menggunakan spektrofotometer UV-Visible dengan reagen Brucine-Sulfat.
            </p>
          </InfoCard>
          
          <InfoCard 
            icon={<FiAward size={24} />} 
            title="Prestasi Terkait"
            delay={0.4}
          >
            <ul className="list-disc ml-4 space-y-1">
              <li>Medali Emas di National Applied Science Project Olympiad 2023</li>
              <li>Medali Emas di National Applied Science Project Olympiad 2022</li>
              <li>Medali Emas di National Applied Science Project Olympiad 2021</li>
              <li>Medali Emas di Youth National Science Fair 2022</li>
            </ul>
          </InfoCard>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-12 max-w-4xl mx-auto"
        >
          <div className="card-glass dark:bg-gray-800/50 dark:border-gray-700 p-6">
            <h3 className="text-xl font-bold mb-4 dark:text-white flex items-center">
              <FiCpu className="mr-2 text-primary-500" />
              Kemampuan Teknis
            </h3>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              <div className="p-3 bg-primary-50 dark:bg-primary-900/30 rounded-lg text-center">
                <h4 className="font-bold dark:text-white">HPLC</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">Kromatografi</p>
              </div>
              <div className="p-3 bg-secondary-50 dark:bg-secondary-900/30 rounded-lg text-center">
                <h4 className="font-bold dark:text-white">UV-VIS</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">Spektrofotometri</p>
              </div>
              <div className="p-3 bg-accent-50 dark:bg-accent-900/30 rounded-lg text-center">
                <h4 className="font-bold dark:text-white">FTIR</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">Inframerah</p>
              </div>
              <div className="p-3 bg-purple-50 dark:bg-purple-900/30 rounded-lg text-center">
                <h4 className="font-bold dark:text-white">AAS</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">Serapan Atom</p>
              </div>
            </div>
            
            <div className="mt-6">
              <h3 className="text-xl font-bold mb-4 dark:text-white flex items-center">
                <FiStar className="mr-2 text-secondary-500" />
                Keterampilan
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium dark:text-white mb-2">Soft Skills:</h4>
                  <p className="text-gray-600 dark:text-gray-300">
                    Komunikasi, berpikir kritis & analitis, manajemen waktu, kerja tim, adaptabilitas
                  </p>
                </div>
                <div>
                  <h4 className="font-medium dark:text-white mb-2">Hard Skills:</h4>
                  <p className="text-gray-600 dark:text-gray-300">
                    Microsoft Office (Word, Excel, PowerPoint), Google Suite, Canva
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-12 text-center"
        >
          <div className="inline-block">
            <div className="relative">
              <div className="px-6 py-3 bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-bold rounded-full shadow-lg hover:shadow-xl transition-shadow">
                Sedang Berlangsung: Persiapan Penelitian
              </div>
              <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-accent-500 animate-pulse"></div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ThesisInfoSection;