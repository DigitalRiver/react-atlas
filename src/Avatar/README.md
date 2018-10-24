
Title prop gets truncated to 1st letter:

    <Avatar title="Nathan" />

Icon takes precedence over title:

    <Avatar title="Nathan" icon="fab fa-github" />

Image takes precedence over icon:

    <Avatar
        icon={"fab fa-github"}
        image="https://upload.wikimedia.org/wikipedia/commons/c/cf/3818_-_Riffelberg_-_Matterhorn_viewed_from_Gornergratbahn.JPG"
        title="Matterhorn"
    />

Image takes precedence over title:

    <Avatar title="Javier" image="https://i.ytimg.com/vi/cNycdfFEgBc/maxresdefault.jpg" />

Child takes precedence over parameters:

    <div>
      <Avatar title="Nathan" image="https://octodex.github.com/images/codercat.jpg">
        <i className="fab fa-github"></i>
      </Avatar>

      <Avatar title="Nathan" icon="fa fa-github">
        <img title="Nathan" src="http://www.lettherebelightfineart.com/wp-content/uploads/2014/03/01_Minneapolis_Skyline_Photography_Stone_Arch_Bridge.jpg"/>
      </Avatar>
    </div>

Image takes precedence over fallbackImage:

    <Avatar title="Nathan" image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGNZh4ycC0G2UbBGDVgJ56hYbZ0j1mU9J05xLg9O5ZazV1GJTT" fallbackImage="https://octodex.github.com/images/codercat.jpg" />

fallbackImage takes precedence over title:

    <Avatar title="Javier" fallbackImage="https://timeincsecure-a.akamaihd.net/rtmp_uds/293884104/201703/2681/293884104_5360456295001_5360434467001-vs.jpg?pubId=293884104&videoId=5360434467001" />

fallbackImage will replace an image that fails to load:

    <Avatar title="Fryxell" image="badImage.jpg" fallbackImage="http://wikitravel.org/upload/shared//thumb/e/ea/Lake_Fryxell.jpg/510px-Lake_Fryxell.jpg" />

Update Avatar options via state after initial render:

    initialState = {image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGNZh4ycC0G2UbBGDVgJ56hYbZ0j1mU9J05xLg9O5ZazV1GJTT"}
    handleToggle = () => {
        setState({image: "https://octodex.github.com/images/codercat.jpg"})
    };
    <div> 
      <Avatar title="Nathan" image={state.image} />
      <br />
      <Button primary onClick={handleToggle}>Update State</Button>
      <br /><br />
      <Text>Image path: {state.image}</Text>
    </div>