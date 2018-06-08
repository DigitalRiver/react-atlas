Accordion:

     <Accordion>
          <div title="First">Lorem ipsum dolor sit amet, cum alienum splendide te, has ad possim equidem, ad novum insolens usu. An his nonumy tritani scripserit, essent nostro sadipscing mea te, indoctum referrentur mea eu. Te unum urbanitas usu, et sed partem postea neglegentur. Pri dicunt sensibus ex, est prodesset efficiendi id, senserit eloquentiam sit ex.

                             Ius ea patrioque pertinacia moderatius. Ius errem aliquam splendide te, ne qui exerci diceret mnesarchum. Erant ludus copiosae ad pri, an illum conclusionemque vim. Mel alia consequat in, velit mundi saperet te pro. Tractatos consequuntur id mea.</div>
          <div title="Second">Lorem ipsum dolor sit amet, cum alienum splendide te, has ad possim equidem, ad novum insolens usu.</div>
          <div title="Third"><Button/></div>
     </Accordion>


Accordion with expandAll:

     <Accordion expandAll>
          <div title="First">Lorem ipsum dolor sit amet, cum alienum splendide te, has ad possim equidem, ad novum insolens usu.</div>
          <div title="Second">Lorem ipsum dolor sit amet, cum alienum splendide te, has ad possim equidem, ad novum insolens usu.</div>
     </Accordion>

Accordion with multiOpen functionality:

     <Accordion multiOpen>
          <div title="First">Lorem ipsum dolor sit amet, cum alienum splendide te, has ad possim equidem, ad novum insolens usu.</div>
          <div title="Second">Lorem ipsum dolor sit amet, cum alienum splendide te, has ad possim equidem, ad novum insolens usu.</div>
     </Accordion>

Accordion with expanded div:

     <Accordion>
          <div title="First">Lorem ipsum dolor sit amet, cum alienum splendide te, has ad possim equidem, ad novum insolens usu.</div>
          <div title="Second" expanded>Lorem ipsum dolor sit amet, cum alienum splendide te, has ad possim equidem, ad novum insolens usu.</div>
     </Accordion>

Accordion with disabled prop:

     <Accordion disabled>
          <div title="First">Lorem ipsum dolor sit amet, cum alienum splendide te, has ad possim equidem, ad novum insolens usu.</div>
          <div title="Second">Lorem ipsum dolor sit amet, cum alienum splendide te, has ad possim equidem, ad novum insolens usu.</div>
          <div title="Third">this is the third div</div>
     </Accordion>

 Accordion with titlePosition set to "center":

      <Accordion titlePosition="center">
           <div title="First">Lorem ipsum dolor sit amet, cum alienum splendide te, has ad possim equidem, ad novum insolens usu. An his nonumy tritani scripserit, essent nostro sadipscing mea te, indoctum referrentur mea eu. Te unum urbanitas usu, et sed partem postea neglegentur. Pri dicunt sensibus ex, est prodesset efficiendi id, senserit eloquentiam sit ex.  Ius ea patrioque pertinacia moderatius. Ius errem aliquam splendide te, ne qui exerci diceret mnesarchum. Erant ludus copiosae ad pri, an illum conclusionemque vim. Mel alia consequat in, velit mundi saperet te pro. Tractatos consequuntur id mea.</div>
           <div title="Second">Lorem ipsum dolor sit amet, cum alienum splendide te, has ad possim equidem, ad novum insolens usu.</div>
           <div title="Third"><Button/></div>
      </Accordion>

Accordion with onClick property:

    <Accordion onClick={ function(index, event, props){ console.log("Click: ", index, event, props) }}>
          <div title="First">Lorem ipsum dolor sit amet, cum alienum splendide te, has ad possim equidem, ad novum insolens usu. An his nonumy tritani scripserit, essent nostro sadipscing mea te, indoctum referrentur mea eu. Te unum urbanitas usu, et sed partem postea neglegentur. Pri dicunt sensibus ex, est prodesset efficiendi id, senserit eloquentiam sit ex.

                             Ius ea patrioque pertinacia moderatius. Ius errem aliquam splendide te, ne qui exerci diceret mnesarchum. Erant ludus copiosae ad pri, an illum conclusionemque vim. Mel alia consequat in, velit mundi saperet te pro. Tractatos consequuntur id mea.</div>
          <div title="Second">Lorem ipsum dolor sit amet, cum alienum splendide te, has ad possim equidem, ad novum insolens usu.</div>
          <div title="Third"><Button/></div>
    </Accordion>

Updating Accordion divs by updating parent state:

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
          <div key={title} title={title} expanded={expanded}>
            Hello there.
          </div>
        )
      }
       
      <div>
        <Accordion>
          {
            state.plans && state.plans.map((plan) => (
              <Plan key={plan.planId} title={plan.planDescription} expanded={plan.expanded} />
            ))
          }
        </Accordion><br />
        <Button primary onClick={handleToggle}>Update State</Button>
      </div>