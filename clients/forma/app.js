'use strict';
const projects = {
  quiet: { title: 'The Quiet House', meta: 'RESIDENTIAL STUDY / 180 M² / 2026', image: 'assets/hero.jpg', description: 'A home organized around shared living and a small planted court. Deep openings soften the light; a continuous living and dining space gives the family room to gather without making every room bigger.' },
  courtyard: { title: 'Courtyard House', meta: 'RESIDENTIAL STUDY / 145 M² / 2026', image: 'assets/courtyard.jpg', description: 'An inward-looking home with a green heart. The courtyard separates private rooms from shared spaces while bringing daylight and moving air into the middle of a compact plan.' },
  still: { title: 'A Still Interior', meta: 'INTERIOR STUDY / 86 M² / 2026', image: 'assets/interior.jpg', description: 'An exploration of fewer, better elements: warm timber, pale surfaces, and storage that lets a small apartment breathe. A flexible dining area doubles as a generous place to work.' }
};
const dialog = document.querySelector('#project-dialog');
document.querySelectorAll('[data-filter]').forEach(button => button.addEventListener('click', () => {
  const filter = button.dataset.filter;
  document.querySelectorAll('[data-filter]').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
  let count = 0;
  document.querySelectorAll('.project').forEach(project => { project.hidden = filter !== 'all' && project.dataset.category !== filter; if (!project.hidden) count++; });
  const category = filter === 'all' ? '' : filter === 'interiors' ? 'interior ' : 'residential ';
  document.querySelector('#project-status').textContent = `Showing ${count} ${category}${count === 1 ? 'study' : 'studies'}.`;
}));
document.querySelectorAll('[data-project]').forEach(button => button.addEventListener('click', () => {
  const project = projects[button.dataset.project];
  document.querySelector('#dialog-title').textContent = project.title;
  document.querySelector('#dialog-meta').textContent = project.meta;
  document.querySelector('#dialog-description').textContent = project.description;
  const image = document.querySelector('#dialog-image'); image.src = project.image; image.alt = `Illustrative photograph for ${project.title}`;
  dialog.showModal();
}));
document.querySelector('.close-dialog').addEventListener('click', () => dialog.close());
document.querySelector('#dialog-inquiry').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => { if (event.target === dialog) { const r = dialog.getBoundingClientRect(); if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) dialog.close(); } });
const rooms = {
  living: ['01 / SHARED SPACE', 'Living & dining', 'One continuous space for meals, conversations, and slow afternoons. Openings at both ends encourage cross ventilation.'],
  kitchen: ['02 / EVERYDAY RITUALS', 'Kitchen', 'A working edge beside the dining space. A long counter keeps preparation close to the conversation, with a direct outlook to the courtyard.'],
  garden: ['03 / OPEN TO THE SKY', 'Courtyard', 'A planted pause at the center of the home. It brings light deeper into the plan and offers a quieter view from the surrounding rooms.'],
  study: ['04 / A LITTLE FOCUS', 'Study', 'A compact room for reading and focused work. Close to family life, with a door that can close when a little separation matters.']
};
document.querySelectorAll('[data-room]').forEach(button => button.addEventListener('click', () => {
  document.querySelectorAll('[data-room]').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
  const [number, title, description] = rooms[button.dataset.room];
  document.querySelector('#room-number').textContent = number; document.querySelector('#room-title').textContent = title; document.querySelector('#room-description').textContent = description;
}));
document.querySelector('#brief-form').addEventListener('submit', event => {
  event.preventDefault(); const data = new FormData(event.currentTarget);
  const text = `FORMA — PROJECT BRIEF\n\nProject: ${data.get('project')}\nApproximate floor area: ${data.get('area')} m²\nTimeline: ${data.get('timeline')}\n\nPriorities\n${data.get('priorities')}\n\nPrepared with the Forma website concept by Morish Macayan.\nNo inquiry has been submitted. Bring this brief to a qualified architect.\n`;
  const url = URL.createObjectURL(new Blob([text], { type: 'text/plain;charset=utf-8' })); const link = document.createElement('a'); link.href = url; link.download = 'forma-project-brief.txt'; link.click(); setTimeout(() => URL.revokeObjectURL(url), 1000);
  document.querySelector('#brief-status').textContent = 'Your brief is ready. Download requested; no inquiry was sent.';
});
