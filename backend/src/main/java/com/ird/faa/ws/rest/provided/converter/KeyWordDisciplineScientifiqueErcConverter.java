package  com.ird.faa.ws.rest.provided.converter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import com.ird.faa.service.util.*;


import com.ird.faa.bean.KeyWordDisciplineScientifiqueErc;
import com.ird.faa.ws.rest.provided.vo.KeyWordDisciplineScientifiqueErcVo;

@Component
public class KeyWordDisciplineScientifiqueErcConverter extends AbstractConverter<KeyWordDisciplineScientifiqueErc,KeyWordDisciplineScientifiqueErcVo>{

        @Autowired
        private KeyWordConverter keyWordConverter ;
        @Autowired
        private DisciplineScientifiqueErcConverter disciplineScientifiqueErcConverter ;
    private Boolean keyWord;
    private Boolean disciplineScientifiqueErc;

public  KeyWordDisciplineScientifiqueErcConverter(){
init(true);
}

@Override
public KeyWordDisciplineScientifiqueErc toItem(KeyWordDisciplineScientifiqueErcVo vo) {
if (vo == null) {
return null;
} else {
KeyWordDisciplineScientifiqueErc item = new KeyWordDisciplineScientifiqueErc();
        if(StringUtil.isNotEmpty(vo.getId()))
        item.setId(NumberUtil.toLong(vo.getId()));
            if(vo.getArchive() != null)
            item.setArchive(vo.getArchive());
        if(StringUtil.isNotEmpty(vo.getDateArchivage()))
        item.setDateArchivage(DateUtil.parse(vo.getDateArchivage()));
        if(StringUtil.isNotEmpty(vo.getDateCreation()))
        item.setDateCreation(DateUtil.parse(vo.getDateCreation()));
    if(vo.getKeyWordVo()!=null && this.keyWord)
        item.setKeyWord(keyWordConverter.toItem(vo.getKeyWordVo())) ;
    if(vo.getDisciplineScientifiqueErcVo()!=null && this.disciplineScientifiqueErc)
        item.setDisciplineScientifiqueErc(disciplineScientifiqueErcConverter.toItem(vo.getDisciplineScientifiqueErcVo())) ;


return item;
}
}

@Override
public KeyWordDisciplineScientifiqueErcVo toVo(KeyWordDisciplineScientifiqueErc item) {
if (item == null) {
return null;
} else {
KeyWordDisciplineScientifiqueErcVo vo = new KeyWordDisciplineScientifiqueErcVo();
        if(item.getId()!=null)
        vo.setId(NumberUtil.toString(item.getId()));

        if(item.getArchive()!=null)
        vo.setArchive(item.getArchive());
        if(item.getDateArchivage()!=null)
        vo.setDateArchivage(DateUtil.formateDate(item.getDateArchivage()));
        if(item.getDateCreation()!=null)
        vo.setDateCreation(DateUtil.formateDate(item.getDateCreation()));
    if(item.getKeyWord()!=null && this.keyWord) {
        vo.setKeyWordVo(keyWordConverter.toVo(item.getKeyWord())) ;
    }
    if(item.getDisciplineScientifiqueErc()!=null && this.disciplineScientifiqueErc) {
        vo.setDisciplineScientifiqueErcVo(disciplineScientifiqueErcConverter.toVo(item.getDisciplineScientifiqueErc())) ;
    }

return vo;
}
}

public void init(Boolean value) {
    keyWord = value;
    disciplineScientifiqueErc = value;
}


        public KeyWordConverter getKeyWordConverter(){
        return this.keyWordConverter;
        }
        public void setKeyWordConverter(KeyWordConverter keyWordConverter ){
        this.keyWordConverter = keyWordConverter;
        }
        public DisciplineScientifiqueErcConverter getDisciplineScientifiqueErcConverter(){
        return this.disciplineScientifiqueErcConverter;
        }
        public void setDisciplineScientifiqueErcConverter(DisciplineScientifiqueErcConverter disciplineScientifiqueErcConverter ){
        this.disciplineScientifiqueErcConverter = disciplineScientifiqueErcConverter;
        }

    public boolean  isKeyWord(){
    return this.keyWord;
    }
    public void  setKeyWord(boolean keyWord){
    this.keyWord = keyWord;
    }
    public boolean  isDisciplineScientifiqueErc(){
    return this.disciplineScientifiqueErc;
    }
    public void  setDisciplineScientifiqueErc(boolean disciplineScientifiqueErc){
    this.disciplineScientifiqueErc = disciplineScientifiqueErc;
    }












}
