Accordion:

     <Accordion data-testid="accordion-default">
          <Panel title="First">Lorem ipsum dolor sit amet, cum alienum splendide te, has ad possim equidem, ad novum insolens usu. An his nonumy tritani scripserit, essent nostro sadipscing mea te, indoctum referrentur mea eu. Te unum urbanitas usu, et sed partem postea neglegentur. Pri dicunt sensibus ex, est prodesset efficiendi id, senserit eloquentiam sit ex.

                             Ius ea patrioque pertinacia moderatius. Ius errem aliquam splendide te, ne qui exerci diceret mnesarchum. Erant ludus copiosae ad pri, an illum conclusionemque vim. Mel alia consequat in, velit mundi saperet te pro. Tractatos consequuntur id mea.</Panel>
          <Panel title="Second">Lorem ipsum dolor sit amet, cum alienum splendide te, has ad possim equidem, ad novum insolens usu.</Panel>
          <Panel title="Third"><Button/></Panel>
     </Accordion>


Accordion with expandAll:

     <Accordion expandAll data-testid="accordion-expandAll">
          <Panel title="First">Lorem ipsum dolor sit amet, cum alienum splendide te, has ad possim equidem, ad novum insolens usu.</Panel>
          <Panel title="Second">Lorem ipsum dolor sit amet, cum alienum splendide te, has ad possim equidem, ad novum insolens usu.</Panel>
     </Accordion>

Accordion with multiOpen functionality:

     <Accordion multiOpen data-testid="accordion-multiOpen">
          <Panel title="First">Lorem ipsum dolor sit amet, cum alienum splendide te, has ad possim equidem, ad novum insolens usu.</Panel>
          <Panel title="Second">Lorem ipsum dolor sit amet, cum alienum splendide te, has ad possim equidem, ad novum insolens usu.</Panel>
     </Accordion>

Accordion with width set in props as number (This is translated to NUMBERpx):

     <Accordion width={400} data-testid="accordion-widthNumber">
          <Panel title="First">Lorem ipsum dolor sit amet, cum alienum splendide te, has ad possim equidem, ad novum insolens usu.</Panel>
          <Panel title="Second">Lorem ipsum dolor sit amet, cum alienum splendide te, has ad possim equidem, ad novum insolens usu.</Panel>
     </Accordion>

Accordion with width set in props as a string:

     <Accordion width='50rem' data-testid="accordion-widthString">
          <Panel title="First">Lorem ipsum dolor sit amet, cum alienum splendide te, has ad possim equidem, ad novum insolens usu.</Panel>
          <Panel title="Second">Lorem ipsum dolor sit amet, cum alienum splendide te, has ad possim equidem, ad novum insolens usu.</Panel>
     </Accordion>

Accordion with expanded panel:

     <Accordion data-testid="accordion-expanded-panel">
          <Panel title="First">Lorem ipsum dolor sit amet, cum alienum splendide te, has ad possim equidem, ad novum insolens usu.</Panel>
          <Panel title="Second" expanded>Lorem ipsum dolor sit amet, cum alienum splendide te, has ad possim equidem, ad novum insolens usu.</Panel>
     </Accordion>

Accordion with disabled prop:

     <Accordion disabled data-testid="accordion-disabled">
          <Panel title="First">Lorem ipsum dolor sit amet, cum alienum splendide te, has ad possim equidem, ad novum insolens usu.</Panel>
          <Panel title="Second">Lorem ipsum dolor sit amet, cum alienum splendide te, has ad possim equidem, ad novum insolens usu.</Panel>
          <Panel title="Third">this is the third panel</Panel>
     </Accordion>

 Accordion with titlePosition set to "center":

      <Accordion titlePosition="center" data-testid="accordion-titleCentered">
           <Panel title="First">Lorem ipsum dolor sit amet, cum alienum splendide te, has ad possim equidem, ad novum insolens usu. An his nonumy tritani scripserit, essent nostro sadipscing mea te, indoctum referrentur mea eu. Te unum urbanitas usu, et sed partem postea neglegentur. Pri dicunt sensibus ex, est prodesset efficiendi id, senserit eloquentiam sit ex.  Ius ea patrioque pertinacia moderatius. Ius errem aliquam splendide te, ne qui exerci diceret mnesarchum. Erant ludus copiosae ad pri, an illum conclusionemque vim. Mel alia consequat in, velit mundi saperet te pro. Tractatos consequuntur id mea.</Panel>
           <Panel title="Second">Lorem ipsum dolor sit amet, cum alienum splendide te, has ad possim equidem, ad novum insolens usu.</Panel>
           <Panel title="Third"><Button/></Panel>
      </Accordion>

Accordion with onClick property:

    <Accordion onClick={ function(index, event, props){ console.log("Click: ", index, event, props) }} data-testid="accordion-onClick">
          <Panel title="First">Lorem ipsum dolor sit amet, cum alienum splendide te, has ad possim equidem, ad novum insolens usu. An his nonumy tritani scripserit, essent nostro sadipscing mea te, indoctum referrentur mea eu. Te unum urbanitas usu, et sed partem postea neglegentur. Pri dicunt sensibus ex, est prodesset efficiendi id, senserit eloquentiam sit ex.

                             Ius ea patrioque pertinacia moderatius. Ius errem aliquam splendide te, ne qui exerci diceret mnesarchum. Erant ludus copiosae ad pri, an illum conclusionemque vim. Mel alia consequat in, velit mundi saperet te pro. Tractatos consequuntur id mea.</Panel>
          <Panel title="Second">Lorem ipsum dolor sit amet, cum alienum splendide te, has ad possim equidem, ad novum insolens usu.</Panel>
          <Panel title="Third"><Button/></Panel>
    </Accordion>

Updating Accordion panels by updating parent state:

      initialState = {plans: [
        {id: 1, planDescription: "Plan One", expanded: true},
        {id: 2, planDescription: "Plan Two", expanded: false}
      ]}

      handleToggle = () => {
        setState({ 
          plans: [
            {id: 1, planDescription: "Plan One", expanded: true},
            {id: 2, planDescription: "Plan Two", expanded: false},
            {id: 3, planDescription: "Plan Three", expanded: false}
          ] 
        })
      };
       
      const Plan = ({ title, expanded }) => {
        return (
          <Panel key={title} title={title} expanded={expanded}>
            Hello there.
          </Panel>
        )
      }
       
      <div>
        <Accordion data-testid="accordion-updateState">
          {
            state.plans && state.plans.map((plan) => (
              <Plan key={plan.planId} title={plan.planDescription} expanded={plan.expanded} />
            ))
          }
        </Accordion><br />
        <Button primary onClick={handleToggle}>Update State</Button>
      </div>