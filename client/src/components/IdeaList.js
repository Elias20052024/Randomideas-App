import IdeasApi from "../services/ideasApi";

class IdeaList {
  constructor() {
    this._ideaListEl = document.querySelector("#idea-list");
    this._ideas = [];
    this.getIdeas();

    this.validTags = new Set();
    this.validTags.add("Technology");
    this.validTags.add("Software");
    this.validTags.add("Business");
    this.validTags.add("Education");
    this.validTags.add("Health");
    this.validTags.add("Inventions");
  }

  addEventListeners() {
    this._ideaListEl.addEventListener("click", (e) => {
      if (e.target.classList.contains("fa-times")) {
        e.stopImmediatePropagation();
        const ideaId = e.target.parentElement.parentElement.dataset.id;
        this.deleteIdea(ideaId);
      }
    });
  }

  async getIdeas() {
    try {
      const res = await IdeasApi.getIdeas();
      this._ideas = res.data.data;
      this.render();
    } catch (error) {
      console.log(error);
    }
  }

  async deleteIdea(ideaId) {
    try {
      const res = await IdeasApi.deleteIdea(ideaId);
      this._ideas = this._ideas.filter((idea) => idea._id !== ideaId);
      this.getIdeas();
    } catch (error) {
      alert("You can not delete this idea");
    }
  }

  addIdeaToList(idea) {
    this._ideas.push(idea);
    this.render();
  }

  getTagClass(tag) {
    tag = tag.toLowerCase();
    let tagClass = "";
    if (this.validTags.has(tag)) {
      tagClass = `tag-${tag}`;
    } else {
      tagClass = "";
    }
    return tagClass;
  }

  render() {
    this._ideaListEl.innerHTML = this._ideas
      .map((idea) => {
        const tagClass = this.getTagClass(idea.tag);
        const deleteBtn =
          idea.username === localStorage.getItem("username")
            ? `<button class="delete"><i class="fas fa-times"></i></button>`
            : "";
        return `<div class="card" data-id="${idea._id}">
              ${deleteBtn}
              <h3>
                ${idea.text}
              </h3>
              <p class="tag tag-${idea.tag.toLowerCase()}">${idea.tag.toUpperCase()}</p>
              <p>
                Posted on <span class="date">${idea.date}</span> by
                <span class="author">${idea.username}</span>
              </p>
            </div>`;
      })
      .join("");
    this.addEventListeners();
  }
}

export default IdeaList;
