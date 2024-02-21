import { Kbd } from "@nextui-org/react";
import React from "react";

export default function InfoCardContent() {
  return (
    <div className="text-sm">
      <h2 className="h2">Create an analyzer</h2>
      <p>
        By following the steps in this page, you will define and register your
        own analyzer.
      </p>
      <h3 className="h3 mt-4">What is an analyzer?</h3>
      {`
      An analyzer is essentially a Python script that is executed on this
      application's server, ad-hoc or scheduled, which will generate a specific
      report about a student project. The reports may then be viewed on a the
      belonging student group's page.`}
      <h3 className="h3 mt-4">What can an analyzer do?</h3>
      There is few limitations to what can be done by an analyzer. It might
      fetch a Git API and generate some statistics, fetch an external web page,
      do some calculations or measures on student code, or something totally
      different. <br />
      <br /> There is also no limitations when it comes to external third-party
      libraries used by the analyzer script. When uploading your script, you
      will also provie a <Kbd>requirements.txt</Kbd> file, which ensures that
      all required libraries are available whenever the script is run.
      <h3 className="h3 mt-4">How should the analyzer script be structured?</h3>
      Since this system is meant to handle user-generated scripts with a variety
      of different functionality, we needed to define a common structure
      regarding how both the input and the output variables are accessed and
      returned. By following the steps in this analyzer generation form, we will
      provide a shell template for how what script should look like, which you
      may then use as a starting point when making your analyzer script.
    </div>
  );
}
