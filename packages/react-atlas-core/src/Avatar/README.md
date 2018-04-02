
Title prop gets truncated to 1st letter:

    <Avatar title="Nathan" />

Icon beats title:

    <Avatar title="Nathan" icon="fa fa-github" />

Image beats icon:

    <Avatar
        icon={"fa fa-github"}
        image="https://upload.wikimedia.org/wikipedia/commons/c/cf/3818_-_Riffelberg_-_Matterhorn_viewed_from_Gornergratbahn.JPG"
    />

Image beats title:

    <Avatar title="Javier" image="https://i.ytimg.com/vi/cNycdfFEgBc/maxresdefault.jpg" />

Child beats parameters:

    <div>
      <Avatar title="Nathan" image="https://octodex.github.com/images/codercat.jpg">
        <i className="fa fa-github"></i>
      </Avatar>

      <Avatar title="Nathan" icon="fa fa-github">
        <img src="http://www.lettherebelightfineart.com/wp-content/uploads/2014/03/01_Minneapolis_Skyline_Photography_Stone_Arch_Bridge.jpg"/>
      </Avatar>
    </div>

Image beats defaultImage:

    <Avatar image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGNZh4ycC0G2UbBGDVgJ56hYbZ0j1mU9J05xLg9O5ZazV1GJTT" defaultImage="https://octodex.github.com/images/codercat.jpg" />

DefaultImage beats title:

    <Avatar title="Javier" defaultImage="https://timeincsecure-a.akamaihd.net/rtmp_uds/293884104/201703/2681/293884104_5360456295001_5360434467001-vs.jpg?pubId=293884104&videoId=5360434467001" />

DefaultImage will replace a image that fails to load:

    <Avatar image="badImage.jpg" defaultImage="http://wikitravel.org/upload/shared//thumb/e/ea/Lake_Fryxell.jpg/510px-Lake_Fryxell.jpg" />