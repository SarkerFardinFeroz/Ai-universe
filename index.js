const loadContent = async (isShowAll) => {
  {
    const res = await fetch(
      "https://openapi.programming-hero.com/api/ai/tools"
    );
    const data = await res.json();
    let tools = data.data.tools;
    const toolsContainer = document.getElementById("tools-container");
    toolsContainer.innerHTML = "";
    const displayTools = (tools) => {
      tools?.forEach((tool) => {
        console.log(tool);
        const div = document.createElement("div");
        div.innerHTML = `
        <div class="border-[1px] border-[rgba(17, 17, 17, 0.10)] rounded-lg p-7 ">
                    <img class="rounded-lg w-full h-[230px]" src="${tool.image}" alt="Image unavailable">
                    <h3 class="text-2xl font-semibold my-6">Features</h3>
                    <ul class="list-decimal list-inside">
                        <li>${tool.features[0]}</li>
                        <li>${tool.features[1]}</li>
                        <li>${tool.features[2]}</li>
                        
                    </ul>
                    <div class="bg-[rgba(17, 17, 17, 0.10)] h-[2px] my-6"><hr></div>
                    <div class="flex items-center justify-between">
                        <div>
                            <h4 class="text-xl font-semibold"></h4>
                            <h4 class="text-sm my-4">📅 ${tool.published_in} </h4>
                        </div>
                        <button onclick="handleModal('${tool.id}')" class="btn btn-error text-white">
                            Learn More
                        </button>
                    </div>
                </div>
        `;
        toolsContainer.appendChild(div);
      });
    };
    const showAllContainer = document.getElementById("show-all-container");
    if (tools.length > 6 && !isShowAll) {
      showAllContainer.classList.remove("hidden");
    } else {
      showAllContainer.classList.add("hidden");
    }
    if (!isShowAll) {
      tools = tools.slice(0, 6);
    }
    displayTools(tools);
  }
};
const showAllHandle = () => {
  loadContent(true);
};
const handleModal = async (tool) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/ai/tool/${tool}`
  );
  const data = await res.json();
  const cardInfo = data.data;
  console.log(cardInfo);
  const modalContainer = document.getElementById("modal-container");
  const div = document.createElement("div");
  div.innerHTML = `
  <dialog id="my_modal_1" class="modal">
  <form method="dialog" class="modal-box max-w-[1250px] p-32">
  <div class="max-w-[1250px] mx-auto grid grid-cols-2 grid-rows-1 gap-6">
                    <!-- left col -->
                <div class="p-7 rounded-2xl border-[1px] border-[#EB5757] bg-[#eb57570d]">
                        <h3 class="text-2xl font-semibold max-w-md">
                            ${cardInfo?.description}
                        </h3>
                        <div class=" text-center rounded-lg grid grid-cols-3 gap-6 mt-6">
                            <div class="bg-white rounded-2xl py-5 px-6">
                                <h4 class="text-base font-bold text-[#03A30A]">${cardInfo.pricing[0].plan}: ${cardInfo.pricing[0].price}</h4>
                            </div>
                            <div class="bg-white rounded-2xl py-5 px-6">
                                <h4 class="text-base font-bold text-[#F28927]">${cardInfo.pricing[1].plan}: ${cardInfo.pricing[1].price}</h4>
                            </div>
                            <div class="bg-white rounded-2xl py-5 px-6">
                                <h4 class="text-base font-bold text-[#EB5757]">${cardInfo.pricing[2].plan}: ${cardInfo.pricing[2].price}</h4>
                            </div>
                        </div>
                        <div class="grid grid-cols-2 my-6">
                            <div>
                                <h3 class="font-semibold text-2xl">Features</h3>
                                <ul class="list-inside list-disc">
                                    <li>${cardInfo?.features[1].feature_name}</li>
                                    <li>${cardInfo?.features[2].feature_name}</li>
                                    <li>${cardInfo?.features[3].feature_name}</li>
                                </ul>
                            </div>
                            <div>
                                <h3 class="font-semibold text-2xl">Integrations</h3>
                                <ul class="list-inside list-disc text-[#585858]">
                                    <li>${cardInfo.integrations[0]}</li>
                                    <li>${cardInfo.integrations[1]}</li>
                                    <li>${cardInfo.integrations[2]}</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <!-- right col -->
                    <div class="p-7 rounded-lg border">
                        <img class="rounded-lg h-[275px] " src="${cardInfo?.image_link[0]}" alt="">
                        <div class="max-w-[360px] mx-auto">
                            <h3 class="text-center mt-6 text-2xl font-bold mb-4 max-w-">${cardInfo.input_output_examples[1].input}</h3>
                        <p class="text-center">${cardInfo.input_output_examples[1].output}</p>
                        </div>
                    </div>
                </div>


</div>
      <!-- if there is a button in form, it will close the modal -->
      <button id="close-btn" class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
    </div>
  </form>
</dialog>
    `;
  modalContainer.appendChild(div);

  const modal = document.getElementById("my_modal_1");
  modal.showModal();
  document.getElementById('close-btn').addEventListener('click',()=>{
    modalContainer.innerHTML=''
  })


};

loadContent();
