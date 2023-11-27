import Banner from '../components/Banner'
import { useMediaQuery } from '@mui/material';

import banner_about from '../assets/images/banner-about.png';
import banner_about_mobile from '../assets/images/banner-about_mobile.png';

function About() {

  const isMobile = useMediaQuery('(max-width: 600px)');
  return (
    <>
      {isMobile ? (
        <Banner img={banner_about_mobile} title="banner pokedex"></Banner>
      ) : (
        <Banner img={banner_about} title="banner pokedex"></Banner>
      )}

      <div className="container about">
        <div className="page-title">
          <h1 className="title"> Pokédex </h1>
        </div>
        <div className="page-description">
          <p>
            Bem-vindo à Pokédex, sua porta de entrada para o fascinante mundo dos Pokémon! Esta é mais do que uma simples enciclopédia virtual; é um espaço dedicado aos treinadores Pokémon e entusiastas que compartilham uma paixão única por essas incríveis criaturas.
          </p>
          <h2>
            Desenvolvimento e Tecnologias:
          </h2>
          <p>
            A Pokédex foi desenvolvida como um projeto de aprendizado, mergulhando no vasto ecossistema do desenvolvimento web moderno. Utilizando a biblioteca React para construir uma interface interativa e responsiva, combinada com a flexibilidade do SCSS para estilização, nossa equipe buscou oferecer uma experiência única de navegação para os treinadores Pokémon de todas as idades.
          </p>
          <h2>
            Objetivo Educacional:
          </h2>
          <p>
            Este projeto não é apenas uma fonte de informações sobre Pokémon; é uma jornada educativa que reflete o processo de aprendizado contínuo em tecnologias web. Cada linha de código, cada componente React e cada estilo SCSS representam passos significativos na evolução das habilidades dos desenvolvedores por trás da Pokédex. Estamos comprometidos em compartilhar essa experiência de aprendizado e inspirar outros a embarcarem em jornadas semelhantes.
          </p>
          <h2>
            Explorando Recursos:
          </h2>
          <p>
            Além das informações abrangentes sobre Pokémon, fornecemos ferramentas interativas, como filtros por tipo, pesquisa por nome e até mesmo uma maneira de encontrar Pokémon aleatórios para adicionar uma pitada de surpresa à sua jornada.
          </p>
          <p>
            A Pokédex é um projeto em constante evolução, assim como o mundo Pokémon. Estamos comprometidos em trazer atualizações regulares, recursos inovadores e, acima de tudo, uma experiência que celebra a diversidade e a magia dessas criaturas extraordinárias.
          </p>
          <p>
            Então, pegue suas Pokébolas, prepare sua equipe e embarque nesta jornada conosco. A Pokédex está aqui para inspirar, informar e acima de tudo, compartilhar o amor pelos Pokémon. Seja bem-vindo ao universo Pokémon na Pokédex - onde a aventura nunca termina!
          </p>
        </div>
      </div>
    </>
  )
}

export default About